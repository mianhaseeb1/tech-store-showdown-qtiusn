import useAuth from '@/contexts/AuthContext'
import LoginPage from '@/pages/LoginPage'
import { Navigate } from 'react-router-dom'

const LoginPageRoute = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Navigate to="/" /> : <LoginPage />
}

export default LoginPageRoute
