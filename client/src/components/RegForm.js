import React, { useState } from 'react'

import { useHttp } from '../hooks/http.hook'
const crypto = require("crypto")

export const RegForm = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')
  const [invalid, setInvalid] = useState('')

  const { request } = useHttp()

  const onSubmit = async event => {
    event.preventDefault()
    if (pass === repeatPass) {
      try {
        function cryptor(value) {
          let sha256 = crypto.createHash("sha256")
          sha256.update(value + '', "utf8")
  
          return sha256.digest("base64")
        }
  
        const data = await request('/api/regUser', 'POST', { email, password: cryptor(pass) })
        
        if (data.status === 200) {
          localStorage.setItem('token', data.token)
          document.location.reload()
        } else {
          setInvalid('Пользователь с таким Email уже существует')
        }

      } catch(e) { console.log(e) }
    } else {
      setInvalid('Пароли не совпадают')
    }
  }

  return (
    <form 
      className='col xl6 offset-xl3 l8 offset-l2 s10 offset-s1' 
      style = {{ marginTop: '40px' }}
      onSubmit = { event => onSubmit(event) }
    >
      
      <div className="input-field">
        <input 
          id="email"
          type="email" 
          className="validate white-text" 
          value = { email }
          onChange = { event => setEmail(event.target.value) }
        />
        <label htmlFor="email">Email</label>
      </div>

      <div className="input-field">
        <input 
          id="password"
          type="password" 
          className="validate white-text" 
          value = { pass }
          onChange = { event => setPass(event.target.value) }
        />
        <label htmlFor="password">Пароль</label>
      </div>

      <div className="input-field">
        <input 
          id="repeatPassword" 
          type="password" 
          className="validate white-text" 
          value = { repeatPass } 
          onChange = { event => setRepeatPass(event.target.value) }
        />
        <label htmlFor="repeatPassword">Повторите пароль</label>
      </div>
      <p style = {{ color: 'tomato', textAlign: 'center' }}> { invalid } </p>
      <button className="waves-effect waves-light btn" style = {{display: 'block', margin: 'auto'}}> Зарегистрироваться </button>
    </form>
  )
}