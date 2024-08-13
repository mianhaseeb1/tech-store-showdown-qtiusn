import { Navigate } from 'react-router-dom'
import useAuth from '../contexts/AuthContext'
import SignupPage from '../pages/SignupPage'

const SignupPageRoute = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Navigate to="/" /> : <SignupPage />
}

export default SignupPageRoute
