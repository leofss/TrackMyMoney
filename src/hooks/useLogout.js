import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./UseAuthContext";

export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () => {
        setError(null)
        setPending(true)

        try {
            await projectAuth.signOut()

            dispatch({type: 'LOGOUT'})
            if(!isCanceled){
                setPending(false)
                setError(null)
            }
            
        } catch (error) {
            if(!isCanceled){
                setError(error.message)
                setPending(false)
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCanceled(true)
        }
    }, [])

    return {logout, error, pending}
}