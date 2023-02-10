import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timeStamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {

  switch (action.type) {
    case "IS_PENDING":
        return {document: null, success: false, error: null, isPending: true}
    case  "ADDED_DOCUMENT":
        return {isPending: false, document: action.payload, success: true, error: null}
    case  "DELETED_DOC":
      return {isPending: false, document: null, success: true, error: null}
    case  "ERROR":
        return {isPending: false, document: null, success: false, error: action.payload}
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  const dispatchIfNotCancelled = (action) => {

        //check if component unomunted
        if(!isCancelled){
            dispatch(action)
        }
  }
  
  // add a document
  const addDocument = async (doc) => {
    dispatch({type: 'IS_PENDING'})
    try{
        const AddedDocuments = await ref.add({...doc})
        dispatchIfNotCancelled({type:'ADDED_DOCUMENT', payload: AddedDocuments})
    }catch(err){
        dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
    }


  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({type: 'IS_PENDING'})
    try {
      const deletedDoc = await ref.doc(id).delete()
      dispatchIfNotCancelled({type: 'DELETED_DOC'})
      
    } catch (error) {
      dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }

}