// styles
import { useFirestore } from '../../hooks/useFirestore'

export default function BalanceList({ balance }) {

  const {deleteDocument } = useFirestore('balance')
  return (
    <ul className="">
      {balance.map((bl) => (
        <li className="my-7 border-solid border-2 border-bg-light-green shadow-md shadow-slate-200 pl-60 h-20 flex items-center relative overflow-hidden border-l-2" key={bl.id}>
          <p className="text-2x1 text-name">{bl.name}</p>
          <p className="ml-auto mr-10 text-name font-bold text-3x1 ">${bl.amount}</p>
          <button className='bg-button text-name py-3 text-center cursor-pointer' onClick={() => deleteDocument(bl.id)}>-</button>
        </li>
      ))}
    </ul>
  )
}