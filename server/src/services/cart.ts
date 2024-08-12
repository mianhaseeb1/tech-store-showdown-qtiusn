import { Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

import { RequestObject } from '../utils/types'
import { HttpException } from '../utils/exceptions/http'

const prisma = new PrismaClient({
	errorFormat: 'minimal'
})

export const addToCartHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {

		const { productId, quantity } = req.body
		const userId = req.currentUser?.id || ''

		let cart = await prisma.cart.findFirst({ where: { userId } })
		const product = await prisma.product.findUnique({ where: { id: productId } })

		if (!product) throw new HttpException(404, 'Product does not exist', [])
		if (product.quantity < quantity) {
			next(new HttpException(400, 'Product does not have enough quantity', []))
			return
		}
		if (!cart) cart = await prisma.cart.create({ data: { userId: userId } })
        
		const existingCartItem = await prisma.cartItem.findFirst({
			where: { cartId: cart.id, productId },
		})

		if (existingCartItem) {
			const updatedQuantity = existingCartItem.quantity + quantity
			if (updatedQuantity > product.quantity) {
				next(new HttpException(400, 'Product does not have enough quantity', []))
				return
			}
			await prisma.cartItem.update({
				where: { id: existingCartItem.id },
				data: { quantity: updatedQuantity },
			})
		} else {
			await prisma.cartItem.create({
				data: { cartId: cart.id, productId, quantity },
			})
		}

		const updatedCart = await prisma.cart.findUnique({
			where: { id: cart.id },
			include: { 
				cartItems: { 
					include: { 
						product: { select: { id: true, description: true, name: true, price: true } } 
					} 
				} 
			}
		})

		const products = updatedCart?.cartItems?.map(item => {
			const { id, description, name, price } = item.product
			return { id, description, name, price, quantity: item.quantity }
		})

		const totalPrice = updatedCart?.cartItems?.reduce((total, item) => {
			return total + (item.quantity * item.product.price)
		}, 0)

		res.json({ id: updatedCart?.id, products, totalPrice})

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getCartHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const userId = req.currentUser?.id || ''
		const cart = await prisma.cart.findFirst({
			where: { userId },
			include: { 
				cartItems: { 
					include: { 
						product: { select: { id: true, description: true, name: true, price: true } } 
					} 
				} 
			}
		})
		if (!cart) {
			const cart = await prisma.cart.create({ data: { userId: userId } })
			res.json({ id: cart.id, products: [], totalPrice: 0 })
		} else {
			const products = cart?.cartItems?.map(item => {
				const { id, description, name, price } = item.product
				return { id, description, name, price, quantity: item.quantity }
			})

			const totalPrice = cart?.cartItems?.reduce((total, item) => {
				return total + (item.quantity * item.product.price)
			}, 0)

			res.json({ id: cart.id, products, totalPrice })
		}
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const removeFromCartHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const { productId } = req.params
		const userId = req.currentUser?.id || ''

		const cart = await prisma.cart.findFirst({ where: { userId } })
		const cartItem = await prisma.cartItem.findFirst({
			where: { cartId: cart?.id, productId },
		})

		if (!cartItem) next(new HttpException(404, 'Product not found in cart', []))

		await prisma.cartItem.delete({ where: { id: cartItem?.id } })

		const updatedCart = await prisma.cart.findUnique({
			where: { id: cart?.id },
			include: { 
				cartItems: { 
					include: { 
						product: { select: { id: true, description: true, name: true, price: true } } 
					} 
				} 
			}
		})

		const products = updatedCart?.cartItems?.map(item => {
			const { id, description, name, price } = item.product
			return { id, description, name, price, quantity: item.quantity }
		})

		const totalPrice = updatedCart?.cartItems?.reduce((total, item) => {
			return total + (item.quantity * item.product.price)
		}, 0)

		res.json({ id: updatedCart?.id, products: products, totalPrice})

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}
