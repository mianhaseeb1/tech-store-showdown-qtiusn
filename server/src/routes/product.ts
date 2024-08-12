import { Router } from 'express'

import { Route } from '../utils/types/index'
import { createProduct, getProduct, getProducts } from '../controllers/product'
import { isAuthenticated } from '../middlewares/isAuth'

const router = Router()

const productRoute: Route[] = [
	{
		method: 'post',
		route: '/',
		middlewares: [isAuthenticated],
		controller: createProduct
	},
	{
		method: 'get',
		route: '/:product_id',
		middlewares: [isAuthenticated],
		controller: getProduct
	},
	{
		method: 'get',
		route: '/',
		middlewares: [isAuthenticated],
		controller: getProducts
	},
]

productRoute.forEach(route => {
	router[route.method](route.route, route.middlewares, route.controller)
})

export { router as productRoutes }
