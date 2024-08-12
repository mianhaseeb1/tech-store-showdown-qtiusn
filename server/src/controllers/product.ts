import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

import { createProductHandler, getProductHandler, getProductsHandler } from '../services/product'
import { validateRequest } from '../utils/validators'
import { HttpException } from '../utils/exceptions/http'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { isValid, error } = await validateRequest(req.body, {
			name: yup.string().required(),
			price: yup.number().required(),
			quantity: yup.number().required(),
			description: yup.string().required(),
		})

		if(isValid) {
			createProductHandler(req, res, next)
		} else {
			next(new HttpException(error.status, error.message, error.data))
		}

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { isValid, error } = await validateRequest(req.params, {
			product_id: yup.string().required()
		})

		if(isValid) {
			getProductHandler(req, res, next)
		} else {
			next(new HttpException(error.status, error.message, error.data))
		}

	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		getProductsHandler(req, res, next)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

/**
 * Swagger documentation for the createProduct function.
 * 
 * @openapi
 * /product:
 *   post:
 *     summary: Create A Product
 *     tags:
 *       - Product
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - description
 *     responses:
 *       200:
 *         description: Product created successfully.
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Internal server error.
 */

/**
 * Swagger documentation for the getProduct function.
 * 
 * @openapi
 * /product/{product_id}:
 *   get:
 *     summary: Get A Product
 *     tags:
 *       - Product
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Internal server error.
 */

/**
 * Swagger documentation for the getProducts function.
 * 
 * @openapi
 * /product:
 *   get:
 *     summary: Get All Products
 *     tags:
 *       - Product
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Internal server error.
 */
