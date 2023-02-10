import React from 'react'
import{useCollection} from '../hooks/useCollection'
import {useAuthContext} from '../hooks/UseAuthContext'

export default function TotalSpendings() {
    const {user} = useAuthContext();
    const {documents, error} = useCollection('transactions', ["uid", "==", user.uid])   
    const UserSpendings =[]
    let sum = 0
    if(documents != null){
        documents.forEach(doc => {
            let spendings = parseFloat(doc.amount)
            UserSpendings.push(spendings)
        });
    }
    UserSpendings.forEach(item => {
        sum += item
    })

  return (
    <>
        {sum} {error && error}
    </>
  )
}
