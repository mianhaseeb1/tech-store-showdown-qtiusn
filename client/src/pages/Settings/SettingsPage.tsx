import { useEffect, useRef } from 'react'

import UserEditForm from '@/components/UserEditForm'
import useUser from '@/contexts/UserContext'

const SettingsPage = () => {
    const { user, activeUser } = useUser()

    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
            activeUser()
            hasFetched.current = true
        }
    }, [activeUser])

    return <>{user && <UserEditForm user={user} />}</>
}

export default SettingsPage
