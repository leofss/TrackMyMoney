import { useEffect, useState } from 'react'
import {useFirestore} from '../../hooks/useFirestore';
export default function TransactionForm({uid}) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const {addDocument, response} = useFirestore('balance')//passa a collection, se não existe firestore cria

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({ 
      uid,
      name, 
      amount,
    })
  }

  useEffect(() => {
    if(response.success){
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add money to your account balance</h3>
      <form className='flex  bg-light-green  p-2 rounded-3xl flex-col mt-3' onSubmit={handleSubmit}>
        <label className='flex flex-col items-center'>
          <span>Transaction name:</span>
          <input
            className='block w-9/12 h-10 p-2.5 mt-1.5 rounded-xl' 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label className='flex flex-col items-center'>
          <span>Amount ($):</span>
          <input
            className='block w-9/12 h-10 p-2.5 mt-1.5 rounded-xl' 
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>
        {!response.isPending && <button className='my-3' >Add balance</button>}
        {response.isPending && <button className='my-3' disabled >Loading...</button>}
      </form>
    </>
  )
}