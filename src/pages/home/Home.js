// styles
import styles from './Home.module.css'
import {useAuthContext} from '../../hooks/UseAuthContext'
import { useCollection } from '../../hooks/useCollection';
import TransactionList from './TransactionList';
// components
import TransactionForm from './TransactionForm'
import TotalSpendings from '../../components/TotalSpendings';

export default function Home() {

  const {user} = useAuthContext();
  const {documents, error} = useCollection('transactions',["uid", "==", user.uid])

  return (
    <div>
      <h2 className='text-3xl flex ml-56 mt-28'>Your total spendings: R$<TotalSpendings/></h2>
      <div className={styles.container}>
        <div className={styles.content}>
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents}/>}
        </div>
        <div className={styles.sidebar}>
          <TransactionForm uid={user.uid}/>
        </div>
      </div>
    </div>
  )
}
