import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const PointRemoveModal = (props) => {
  let modalStyle = {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: '#00000070',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000
  }


  const { request } = useHttp()

  const onSubmit = async () => {

    try {
      let points = props.user.points
      points.splice(props.index, 1)

      await request('/api/setPoints', 'POST', { token: props.user.token, points })
      props.getUserHandler()
      props.setModalRemovePoint()
    } catch (e) { console.log(e) }
  }

  return (
    <div id = 'modal' style = { modalStyle } onClick = { (event) => { 
      if (event.target.id === 'modal') {
        props.setModalRemovePoint()
      }
    } }>
      <div className = 'grey darken-4 teal-text' style = {{ padding: '20px 20px' }}>
        <h5 style = {{ color: '#4db6ac', textAlign: 'center' , marginBottom: '30px'}}> Удалить точку? </h5>
        <div style = {{ display: 'flex', justifyContent: 'center' }}>

          <button 
            className="waves-effect waves-light btn" 
            style = {{ marginRight: '15px' }}
            onClick={ () => { onSubmit() } }
          > Удалить </button>

          <button 
            className="waves-effect waves-light btn" 
            onClick = { () => props.setModalRemovePoint('') }
          > Отмена </button>

        </div>
      </div>
    </div>
  )
}