import React, { useState, useEffect } from 'react'

import { Auth } from './pages/Auth'
import { User } from './pages/User'

import { useHttp } from './hooks/http.hook'

export default function App() {
  const [user, setUser] = useState('')
  const {loading, request} = useHttp()

  const getUserHandler = async () => {
    try {
      const data = await request('/api/getUser', 'POST', { token: localStorage.getItem('token') })

      if (data.status !== 200) {
        localStorage.removeItem('token')
      } else {
        setUser(data.user)
      }

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserHandler()
    }
  }, [])
  
  if (user) {
    return <User user = { user } getUserHandler = { () => { getUserHandler() } }/>
  } else {
    return <Auth />
  }

}


