import React, { useState } from 'react'
import { YMaps, Map } from 'react-yandex-maps';

import { AuthForm } from '../components/AuthForm'
import { RegForm } from '../components/RegForm'

export const Auth = () => {
  const [tab, setTab] = useState('auth')
  
  return (
    <div className = "row" style={{ height: '100vh' }}>
      <div className = "col s12 l8 grey darken-4" style={{ height: '100vh', padding: 0 }}>

        <ul className = "tabs">
          <li 
            className = {tab === 'auth' ? "tab col s6 light-blue darken-2": "tab col s6 blue-grey"} 
            style = {{ cursor: 'pointer' }}
            onClick = { () => { setTab('auth') } }
          > 
            Вход 
          </li>
          <li 
            className = {tab === 'reg' ? "tab col s6 light-blue darken-2": "tab col s6 blue-grey"} 
            style = {{ cursor: 'pointer' }}
            onClick = { () => { setTab('reg') } }
          > 
            Регистрация 
          </li>
        </ul>

        {
          tab === 'auth' ? 
          <div className="row">
            <AuthForm />
          </div> :
          <div className="row">
            <RegForm />
          </div>
        }

      </div>


      <div className = "col s0 l4" style = {{ padding: 0 }}>
        <YMaps>
          <div>
            <Map 
              defaultState={{ center: [55.75, 37.57], zoom: 9 }} 
              width = '100%'
              height = '105vh'
            />
          </div>
        </YMaps>
      </div>
    </div>
          
  )
}