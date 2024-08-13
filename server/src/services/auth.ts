import bcrypt from 'bcrypt'

import { Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

import { HttpException } from '../utils/exceptions/http'
import { RequestObject } from '../utils/types'
import { signToken } from '../utils/helperFunctions'

const prisma = new PrismaClient({
	errorFormat: 'minimal'
})

export const signUpHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const { name, email, password } = req.body
		const passwordHash = await bcrypt.hash(password, 10)
		const userExists = await prisma.user.findUnique({
			where: {
				email
			}
		})
		if (userExists) {
			next(new HttpException(400, 'User already exists', {}))
		}
		const user = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash,
			},
			select: {
				id: true,
				name: true,
				email: true,
			}
		})
		return res.status(201).json(user)
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}

export const loginHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body
		const passwordHash = await bcrypt.hash(password, 10)
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if(user) {
			const isPasswordValid = await bcrypt.compare(password, user?.passwordHash || '')
			if (isPasswordValid) {
				const userPayload = {
					id: user.id,
					email: user.email,
					name: user.name,
				}
				const token = await signToken(userPayload)
				return res.status(200).json({ token, user: userPayload })
			}

			next(new HttpException(400, 'Invalid email or password', {}))
		}
		else {
			next(new HttpException(400, 'Invalid email or password', {}))
		}
	} catch (error: any) {
		next(new HttpException(400, error?.message, error.response?.data || error))
	}
}
