import { signIn } from "../services/Login"

const useLogin = async ({ user, pass }) => {
    try {
        const userData = await signIn({username: user, password: pass})
        console.log(userData)
    } catch (error) {
        console.log(error)
    }
}

export default useLogin