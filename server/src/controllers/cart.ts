import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

import { addToCartHandler, getCartHandler, removeFromCartHandler } from '../services/cart'
import { validateRequest } from '../utils/validators'
import { HttpException } from '../utils/exceptions/http'

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { isValid, error } = await validateRequest(req.body, {
			productId: yup.string().uuid().required(),
			quantity: yup.number().required(),
		})
		if(isValid) {
			addToCartHandler(req, res, next)
		} else {
			next(new HttpException(error.status, error.message, error.data))
		}
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
	try {
		getCartHandler(req, res, next)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
	try {
        console.log('req.params of DELETE cart', req.params)
		const { isValid, error } = await validateRequest(req.params, {
			productId: yup.string().uuid().required(),
		})
		if(isValid) {
			removeFromCartHandler(req, res, next)
		} else {
			next(new HttpException(error.status, error.message, error.data))
		}
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

/**
 * Swagger documentation for the addToCart function.
 * 
 * @openapi
 * /cart:
 *   post:
 *     summary: Add Product to Cart
 *     tags:
 *       - Cart
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the product to add to the cart.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add to the cart.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *       400:
 *         description: Invalid Request.
 *       500:
 *         description: Internal server error.
 */

/**
 * Swagger documentation for the getCart function.
 * 
 * @openapi
 * /cart:
 *   get:
 *     summary: Get Cart
 *     tags:
 *       - Cart
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved cart.
 *       400:
 *         description: Invalid Request.
 *       500:
 *         description: Internal server error.
 */

/**
 * Swagger documentation for the removeFromCart function.
 * 
 * @openapi
 * /cart/{productId}:
 *   delete:
 *     summary: Remove Product from Cart
 *     tags:
 *       - Cart
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the product to remove from the cart.
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
 *       400:
 *         description: Invalid Request.
 *       500:
 *         description: Internal server error.
 */
