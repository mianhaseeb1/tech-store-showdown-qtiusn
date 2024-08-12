import { Router } from 'express'

import { productRoutes } from './product'
import { cartRoutes } from './cart'
import { orderRoutes } from './order'
import { authRoutes } from './auth'

const appRouter = Router()

appRouter.use('/product', productRoutes)
appRouter.use('/cart', cartRoutes)
appRouter.use('/auth', authRoutes)
appRouter.use('/order', orderRoutes)

export { appRouter }
