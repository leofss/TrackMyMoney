import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./UseAuthContext";

export const useLogin = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            dispatch({type: 'LOGIN', payload: res.user})
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

    return {login, error, pending}
}