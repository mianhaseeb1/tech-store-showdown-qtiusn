import axios from '../axiosConfig'

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/auth/login', { email, password })

        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const signupUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post('/auth/register', { name, email, password })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}
