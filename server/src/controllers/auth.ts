import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

import { signUpHandler, loginHandler } from '../services/auth'
import { validateRequest } from '../utils/validators'
import { HttpException } from '../utils/exceptions/http'

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    
	const { isValid, error } = await validateRequest(req.body, {
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
	})

	if(isValid) {
		signUpHandler(req, res, next)    
	} else {
		next(new HttpException(error.status, error.message, error.data))
	}
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { isValid, error } = await validateRequest(req.body, {
		email: yup.string().email().required(),
		password: yup.string().required(),
	})

	if(isValid) {
		loginHandler(req, res, next)    
	} else {
		next(new HttpException(error.status, error.message, error.data))
	}
}

/**
 * Swagger documentation for the signUp function.
 * 
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Sign up a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: 'John Doe'
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: 'user@example.com'
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: 'password' 
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User signed up successfully.
 *       400:
 *         description: Invalid Request.
 *       500:
 *         description: Internal server error.
 */

/**
 * Swagger documentation for the login function.
 * 
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: 'user@example.com'
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: 'password' 
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid Request.
 *       500:
 *         description: Internal server error.
 */
