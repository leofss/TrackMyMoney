import { useEffect, useState } from 'react'
import {useFirestore} from '../../hooks/useFirestore';
import { useTotalAmount } from '../../hooks/useTotalAmount';
export default function TransactionForm({uid}) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const {addDocument, response} = useFirestore('transactions')//passa a collection, se não existe firestore cria
  const {sum: sumTransactions} = useTotalAmount("transactions")
  const {sum: sumBalance} = useTotalAmount("balance")
  const {totalUpdated} = useTotalAmount("balance",sumBalance, sumTransactions)

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
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>
        {totalUpdated <= 0  && <button className='' disabled >Not enough balance</button>}
        {!response.isPending && totalUpdated > 0 && <button>Add Transaction</button>}
        {response.isPending && <button disabled >Loading...</button>}
      </form>
    </>
  )
}