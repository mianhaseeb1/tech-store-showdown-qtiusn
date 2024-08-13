import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

export const UserContext = createContext({
    user: null,
    loading: false,
    activeUser: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {}, [user])

    const activeUser = async () => {
        try {
            setLoading(true)
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
        } catch (error) {
            console.error('Error retrieving user from local storage:', error)
        } finally {
            setLoading(false)
        }
    }

    return <UserContext.Provider value={{ user, loading, activeUser }}>{children}</UserContext.Provider>
}

export default function useUser() {
    return useContext(UserContext)
}
