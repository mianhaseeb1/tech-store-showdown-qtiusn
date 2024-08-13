import { loginUser, signupUser } from '@/api'
import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

type AuthContext = {
    isAuthenticated: boolean
    isLoading: boolean
    user: any
    login: (email: string, password: string) => void
    signup: (name: string, email: string, password: string) => void
    logout: () => void
    getJWT: () => string | null
}

export const AuthContext = createContext<AuthContext>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    login: () => {},
    signup: () => {},
    logout: () => {},
    getJWT: () => null,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token')
            const storedUser = localStorage.getItem('user')
            if (token && storedUser) {
                setIsAuthenticated(!!token)
                setUser(JSON.parse(storedUser))
            }
            setIsAuthenticated(!!token)
        }

        checkAuthStatus()
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(false)
        const response = await loginUser(email, password)
        if (response) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            setUser(response.user)
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }

    const signup = async (name: string, email: string, password: string) => {
        await signupUser(name, email, password)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
    }

    const getJWT = () => {
        return localStorage.getItem('token')
    }

    return <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, signup, logout, getJWT }}>{children}</AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}
