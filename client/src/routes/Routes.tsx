import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom'

import useAuth from '../contexts/AuthContext'

// USER PAGES
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

import OrdersPage from '../pages/OrdersPage'
import SettingsPage from '../pages/Settings/SettingsPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'

// GENERAL PAGES
import NotFoundPage from '../pages/NotFoundPage'
import LoadingPage from '../pages/LoadingPage'

// ALL ROUTES
import LoginPageRoute from './LoginPageRoute'
import SignupPageRoute from './SignupPageRoute'
import PrivateRoute from './PrivateRoute'
import ProductAddPage from '@/pages/Settings/ProductAddPage'

function Routes() {
    const { isLoading } = useAuth()
    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <BrowserRouter>
                    <RouterRoutes>
                        <Route path="/login" element={<LoginPageRoute />} />
                        <Route path="/signup" element={<SignupPageRoute />} />
                        <Route path="/" element={<PrivateRoute />}>
                            <Route index element={<HomePage />} />
                            {/* <Route path="home" element={<HomePage />} /> */}
                            <Route path="cart" element={<CartPage />} />
                            <Route path="checkout" element={<CheckoutPage />} />
                            <Route path="orders" element={<OrdersPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                            <Route path="product/new" element={<ProductAddPage />}></Route>
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </RouterRoutes>
                </BrowserRouter>
            )}
        </>
    )
}

export default Routes
