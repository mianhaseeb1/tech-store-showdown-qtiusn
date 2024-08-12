import { Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

import { AddressType, RequestObject } from '../utils/types'
import { HttpException } from '../utils/exceptions/http'

const prisma = new PrismaClient({
	errorFormat: 'minimal'
})

export const getAllOrdersHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {

		const userId: string = req.currentUser?.id || ''

		const orders = await prisma.order.findMany({
			where: {
				userId,
			},
			include: {
				orderItems: true,
				address: true,
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		res.json(orders)

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getOrderByIdHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const { orderId } = req.params

		const order = await prisma.order.findUnique({
			where: {
				id: orderId
			},
			include: {
				orderItems: true,
				address: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true
					}
				}
			}
		})
		res.json({ message: 'Order fetched successfully', order })

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const createOrderHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const userId = req.currentUser?.id || ''
		const { products, shippingAddress } = req.body
		const { addressLine1, addressLine2, city, state, postalCode, country } = shippingAddress

		const address = await prisma.address.create({
			data: {
				addressLine1,
				addressLine2,
				city,
				state,
				postalCode,
				country,
				type: AddressType.SHIPPING,
				user: {
					connect: { id: userId }
				}
			}
		})

		const savedProduct = await prisma.product.findMany({
			where: {
				id: {
					in: products.map((product: any) => product.productId)
				}
			}
		})

		// handle if product is not found raise error
		const foundProductIds = savedProduct.map((product) => product.id)
		const missingProductIds = products
			.map((product: any) => product.productId)
			.filter((productId: string) => !foundProductIds.includes(productId))

		if (missingProductIds.length > 0) {
			next(new HttpException(404, 'Product not found', {}))
			return
		}

		const orderItems = products.map((product: any) => ({
			productId: product.productId,
			quantity: product.quantity,
			unitPrice: savedProduct.find((p) => p.id === product.productId)?.price
		}))

		const totalPrice = orderItems.reduce((acc: any, item: any) => {
			const product = savedProduct.find((p) => p.id === item.productId)
			return acc + (product?.price || 0) * item.quantity
		}, 0)

		const order = await prisma.order.create({
			data: {
				userId,
				addressId: address.id,
				totalPrice,
				orderItems: { create: orderItems }
			},
			include: { orderItems: true, address: true }
		})

		res.json({ message: 'Order created successfully', order })

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}
