import { Router } from 'express'

import { Route } from '../utils/types/index'
import { addToCart, getCart, removeFromCart } from '../controllers/cart'
import { isAuthenticated } from '../middlewares/isAuth'

const router = Router()

const cartRoute: Route[] = [
	{
		method: 'post',
		route: '/',
		middlewares: [isAuthenticated],
		controller: addToCart
	},
	{
		method: 'get',
		route: '/',
		middlewares: [isAuthenticated],
		controller: getCart
	},
	{
		method: 'delete',
		route: '/:productId',
		middlewares: [isAuthenticated],
		controller: removeFromCart
	}
]

cartRoute.forEach(route => {
	router[route.method](route.route, route.middlewares, route.controller)
})

export { router as cartRoutes }
