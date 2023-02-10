import { Link } from "react-router-dom"
import {useLogout} from '../hooks/useLogout'

//retorna o contexto atual
import { useAuthContext } from "../hooks/UseAuthContext"
// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const {logout} = useLogout()
  const {user} = useAuthContext();
  return (
    <nav className={styles.navbar}>
      <ul>
      <li className={styles.title}><Link to="/login">myMoney</Link></li>
        {!user && (
          //necessario fragmento para servir como root
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        {user && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>Hello, {user.displayName}</li>
            <li><button className="btn" onClick={logout}>logout</button></li>

          </>
        )}
      </ul>
    </nav>
  )
}