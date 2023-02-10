import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import {useAuthContext} from './UseAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const {dispatch} = useAuthContext()
    const [isCanceled, setIsCanceled] = useState(false)

    const signup = async (email, password, displayName) =>{
        
        setError(null)
        setPending(true)

        try {

            const resp = await projectAuth.createUserWithEmailAndPassword(email, password)
            if(!resp){
                throw new Error('Could not complete signup')
            }
            await resp.user.updateProfile({displayName})
            

            //dispatch login
            dispatch({type: 'LOGIN', payload: resp.user})
            if(!isCanceled){
                setPending(false)
                setError(null)
            }
            
        } catch (error) {
            if(!isCanceled){
                console.log(error.message)
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
    return {error, pending, signup}
}
