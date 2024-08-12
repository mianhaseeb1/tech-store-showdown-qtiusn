import { Router } from 'express'

import { Route } from '../utils/types/index'
import { getAllOrders, getOrderById, createOrder } from '../controllers/order'
import { isAuthenticated } from '../middlewares/isAuth'

const router = Router()

const orderRoute: Route[] = [
	{
		method: 'get',
		route: '/',
		middlewares: [isAuthenticated],
		controller: getAllOrders
	},
	{
		method: 'get',
		route: '/:orderId',
		middlewares: [isAuthenticated],
		controller: getOrderById
	},
	{
		method: 'post',
		route: '/',
		middlewares: [isAuthenticated],
		controller: createOrder
	}

]

orderRoute.forEach(route => {
	router[route.method](route.route, route.middlewares, route.controller)
})

export { router as orderRoutes }
