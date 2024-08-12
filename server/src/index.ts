import express, { urlencoded, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { setupSwagger } from './utils/swagger/swagger'

import errorHandler from './middlewares/errorHandler'
import secrets from '../secrets'
import { appRouter as appRoutes } from './routes'

const app = express()
const prisma = new PrismaClient({
	errorFormat: 'pretty'
})

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use(appRoutes)
app.use(errorHandler)

setupSwagger(app)

app.use('/', (req: Request, res: Response) => {
	res.send(`Please visit <a href="http://localhost:${secrets.port}/api-docs">Documentation routes</a> for API routes.`)
})

try {
	(async () => await prisma.$connect())()
	console.log('Database connection established.')
	app.listen(secrets.port, () => {
		console.log(`Server started at PORT ${secrets.port}`)
	})
} catch (error) {
	console.error('Unable to connect to the database:', error)
	process.exit(1)
}
