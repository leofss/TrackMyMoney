import style from './Signup.module.css'
import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayname, setDisplayName] = useState('')
  const {signup, error, pending} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayname)
  }
  return (
    <form onSubmit={handleSubmit} className={style['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>display name:</span>
        <input type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayname} ></input>
      </label>

      <label>
        <span>email:</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
      </label>

      <label>
        <span>password:</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} ></input>
      </label>

      {!pending && <button className="btn">Signup</button>}
      {pending && <button className='btn' disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}
