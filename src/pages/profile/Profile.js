import {useAuthContext} from '../../hooks/UseAuthContext'
import {useTotalAmount} from '../../hooks/useTotalAmount'
import BalanceForm from './BalanceForm';
import BalanceList from './BalanceList';
import { useCollection } from '../../hooks/useCollection';
import { useEffect, useState } from 'react';

export default function Profile() {
  const {user} = useAuthContext();
  const {documents, error} = useCollection('balance',["uid", "==", user.uid])
  const {sum: sumTransactions} = useTotalAmount("transactions")
  const {sum: sumBalance} = useTotalAmount("balance")
  const {totalUpdated} = useTotalAmount("transaction",sumBalance, sumTransactions)

  return (
    <div>
      <div className='flex items-center flex-col mt-10'>
        <h1 className="text-3xl font-bold" >Welcome to your profile page {user.displayName}</h1>
        <h2 className='text-2x1 mt-4'>Here you can see more informations about you and add money to you acoount
        balance</h2>
      </div>

      <div className='grid grid-cols-3 justify-items-center mt-10'>
        <div>
          <p>Total balance: R${sumBalance}</p>
          <p>Total spendings: R${sumTransactions}</p>
          <p className={totalUpdated >= 0 ? 'text-total-positive' : 'text-rose-600'}>Total: R${totalUpdated}</p>
        </div>
        <div className='w-full'>
          {documents && <BalanceList balance={documents}/>}
        </div>
        <div className='flex flex-col'>
          <BalanceForm uid={user.uid}/>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}


