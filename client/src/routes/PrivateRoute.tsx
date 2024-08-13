import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../contexts/AuthContext'
import { UserProvider } from '@/contexts/UserContext'
import Layout from '@/components/Layout/Layout'
import { ProductProvider } from '@/contexts/ProductContext'
import { CartProvider } from '@/contexts/CartContext'
import { OrderProvider } from '@/contexts/OrderContext'

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? (
        <UserProvider>
            <OrderProvider>
                <ProductProvider>
                    <CartProvider>
                        <Layout>
                            <Outlet />
                        </Layout>
                    </CartProvider>
                </ProductProvider>
            </OrderProvider>
        </UserProvider>
    ) : (
        <Navigate to="/login" />
    )
}

export default PrivateRoute
