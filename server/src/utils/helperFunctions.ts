import jwt from 'jsonwebtoken'
import secrets from '../../secrets'


export const verifyToken = async (token: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secrets.jwtConfig.SECRET, (err, decoded) => {
			if (err) {
				reject(err)
			}
			resolve(decoded)
		})
	})
}

export const signToken = async (payload: any): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secrets.jwtConfig.SECRET, { expiresIn: secrets.jwtConfig.EXPIRES_IN }, (err, token) => {
			if (err) {
				reject(err)
			}
			resolve(token as string)
		})
	})
}