import { Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

import { RequestObject } from '../utils/types'
import { HttpException } from '../utils/exceptions/http'

const prisma = new PrismaClient({
	errorFormat: 'minimal'
})

export const createProductHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		
		const { name, price, description, quantity } = req.body
		const { currentUser } = req

		const product = await prisma.product.create({
			data: {
				name,
				price,
				description,
				quantity,
				owner: {
					connect: {
						id: currentUser?.id
					}
				}
			},
			select: {
				id: true,
				name: true,
				price: true,
				description: true,
				owner: {
					select: { id: true, name: true, email: true }
				}
			}
		})

		return res.status(201).json(product)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getProductHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id: req.params.product_id
			}, 
			include: {
				owner: {
					select: { id: true, name: true, email: true }
				}
			}
		})

		return res.status(200).json(product)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getProductsHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const products = await prisma.product.findMany({
			include: {
				owner: {
					select: { id: true, name: true, email: true }
				}
			}
		})

		return res.status(200).json(products)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}
