import style from './Login.module.css'
import React, {useState} from 'react'
import { useLogin } from '../../hooks/useLogin'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, pending} = useLogin()
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  return (
    <form onSubmit={handleSubmit} className={style['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
      </label>

      <label>
        <span>password:</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} ></input>
      </label>

      {!pending && <button className="btn">Login</button>}
      {pending && <button className='btn' disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}
