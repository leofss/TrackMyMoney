import {useAuthContext} from '../../hooks/UseAuthContext'
import TotalAmount from '../../components/TotalAmount';
import BalanceForm from './BalanceForm';
import BalanceList from './BalanceList';
import { useCollection } from '../../hooks/useCollection';

export default function Profile() {
  const {user} = useAuthContext();
  const {documents, error} = useCollection('balance',["uid", "==", user.uid])

  return (
    <div>
      <div className='flex items-center flex-col mt-10'>
        <h1 className="text-3xl font-bold" >Welcome to your profile page {user.displayName}</h1>
        <h2 className='text-2x1 mt-4'>Here you can see more informations about you and add money to you acoount
        balance</h2>
      </div>

      <div className='grid grid-cols-3 justify-items-center mt-10'>
        <div>
          <p>Total spendings: R$<TotalAmount collection={'balance'}/></p>
        </div>
        <div className=''>
          {documents && <BalanceList balance={documents}/>}
        </div>
        <div className='flex bg-light-green flex-col p-2 rounded-3xl'>
          <BalanceForm uid={user.uid}/>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}
