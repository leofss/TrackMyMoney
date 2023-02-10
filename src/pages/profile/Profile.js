import styles from '../../index.css'
import {useAuthContext} from '../../hooks/UseAuthContext'
import TotalSpendings from '../../components/TotalSpendings';


export default function Profile() {
  const {user} = useAuthContext();
  return (
    <div>
      <div className='flex items-center flex-col mt-10'>
        <h1 className="text-3xl font-bold" >Welcome to your profile page {user.displayName}</h1>
        <h2 className='text-2x1 mt-4'>Here you can see more informations about you</h2>
      </div>

      <div>
        Total spendings: R$<TotalSpendings/>
      </div>
    </div>
  )
}
