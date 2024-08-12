import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import secrets from '../../../secrets'

const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Techary Tech Store API Documentation',
			version: '1.0.0',
			description: 'API Documentation',
		},
		components: {
			securitySchemes: {
				ApiKeyAuth: {
					type: 'apiKey',
					in: 'header',
					name: 'x-access-token',
					
				}
			}
		},
		servers: [
			{ url: `http://localhost:${secrets.port}`, description: 'Development Server' },
		],
	},
	apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export function setupSwagger(app: Express): void {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
