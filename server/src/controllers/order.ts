import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

import { getAllOrdersHandler, getOrderByIdHandler, createOrderHandler } from '../services/order'
import { validateRequest } from '../utils/validators'
import { HttpException } from '../utils/exceptions/http'

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
	try {
		getAllOrdersHandler(req, res, next)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { isValid, error } = await validateRequest(req.params, {
			orderId: yup.string().required(),
		})

		if(isValid) {
			getOrderByIdHandler(req, res, next)
		} else {
			next(new HttpException(error.status, error.message, error.data))
		}    
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { isValid, error } = await validateRequest(req.body, {
			products: yup.array().of(
				yup.object().shape({
					productId: yup.string().required(),
					quantity: yup.number().required().positive().integer(),
				})).required(),
			shippingAddress: yup.object().shape({
				addressLine1: yup.string().required(),
				addressLine2: yup.string(),
				city: yup.string().required(),
				state: yup.string().required(),
				postalCode: yup.string().required(),
				country: yup.string().required(),
			}).required()
		})

		if(isValid) {
			createOrderHandler(req, res, next)
		} else {
			next(new HttpException(error.status, error.message, error.data))
		}    
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

/**
 * Swagger documentation for the getOrderById function.
 * 
 * @openapi
 * /order/{orderId}:
 *   get:
 *     summary: Get Order by ID
 *     tags:
 *       - Order
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the order.
 *       400:
 *         description: Invalid Request.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * Swagger documentation for the getAllOrders function.
 * 
 * @openapi
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Order
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * Swagger documentation for the createOrder function.
 * 
 * @openapi
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Order
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID of the product
 *                       example: "12345"
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product
 *                       example: 2
 *                 description: Array of products in the order
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   addressLine1:
 *                     type: string
 *                     description: Address line 1
 *                     example: "123 Main St"
 *                   addressLine2:
 *                     type: string
 *                     description: Address line 2
 *                     example: "Apt 4B"
 *                   city:
 *                     type: string
 *                     description: City
 *                     example: "New York"
 *                   state:
 *                     type: string
 *                     description: State
 *                     example: "NY"
 *                   postalCode:
 *                     type: string
 *                     description: Postal code
 *                     example: "10001"
 *                   country:
 *                     type: string
 *                     description: Country
 *                     example: "USA"
 *                 description: Shipping address for the order
 *     responses:
 *       201:
 *         description: Successfully created the order.
 *       400:
 *         description: Invalid Request.
 *       500:
 *         description: Internal server error.
 */
