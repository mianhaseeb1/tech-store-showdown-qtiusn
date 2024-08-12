import { Response, NextFunction } from 'express'

import { PrismaClient } from '@prisma/client'

import { HttpException } from '../utils/exceptions/http'
import { RequestObject } from '../utils/types'
import { verifyToken } from '../utils/helperFunctions'

const prisma = new PrismaClient({
	errorFormat: 'pretty'
})

export const isAuthenticated = async (
	req: RequestObject,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers['x-access-token'] as string
	if (!token) {
		next(new HttpException(401, 'Token Missing!', []))
	}

	try {
		const userData = await verifyToken(token)
		if (!userData) {
			next(new HttpException(401,'Invalid Token! Please Login Again',[]))
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userData.id,
				email: userData.email
			},
			select: {
				id: true,
				name: true,
				email: true,
			}
		})
		if (user) {
			req.currentUser = user	
		} else {
			next(new HttpException(401, 'User not found!', []))
		}

		console.log('User:', req.currentUser)
		
		next()
	} catch (error) {
		console.error(error)
		next(new HttpException(401, 'Not Authenticated', []))
	}
}
