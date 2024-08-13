import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Routes from './routes/Routes'

function App() {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </>
    )
}

export default App
