// styles
import { useFirestore } from '../../hooks/useFirestore'

export default function BalanceList({ balance }) {

  const {deleteDocument } = useFirestore('balance')
  return (
    <ul className="">
      {balance.map((bl) => (
        <li className="flex items-center overflow-hidden my-8 mx-auto relative border-solid border-2 border-bg-light-green shadow-md shadow-slate-200 p-5 " key={bl.id}>
          <p className="text-2x1 text-name">{bl.name}</p>
          <p className="ml-auto mr-10 text-name font-bold text-3x1 ">${bl.amount}</p>
          <button className='absolute top-0 right-0 bg-button text-name text-center py-3 px-2 cursor-pointer text-xs leading-0' onClick={() => deleteDocument(bl.id)}>-</button>
        </li>
      ))}
    </ul>
  )
} 


/* 
    border: none;
    font-size: 0.9em;
    */