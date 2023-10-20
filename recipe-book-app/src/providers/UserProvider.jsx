import { createContext, useContext, useState } from 'react'
import { getUserLocalStorage,deleteUserLocalStorage, setUserLocalStorage } from '../utils/Token'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const handleLogin = (user) => {
        setUserLocalStorage(user)
        setUser(user)
    }

    const handleLogout = () => {
        deleteUserLocalStorage()
        setUser(null)
    }

    const userLocalData = getUserLocalStorage()

    if (!user && userLocalData) {
        try {
            const userData = JSON.parse(userLocalData)
            setUser(userData)
        } catch (error) {
            console.log({ 'error': error })
        }
    }

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}

const useContextUser = () => {
    return useContext(UserContext)
}

export { useContextUser, UserProvider }