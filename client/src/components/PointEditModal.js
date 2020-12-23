import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const PointEditModal = (props) => {

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
    justifyContent: 'center'
  }

  const [title, setTitle] = useState(props.user.points[props.index].title)
  const [latitude, setLatitude] = useState(props.user.points[props.index].latitude)
  const [longitude, setLongitude] = useState(props.user.points[props.index].longitude)
  const [invalid, setInvalid] = useState('')

  const { request } = useHttp()

  const onSubmit = async event => {
    event.preventDefault()

    try {
      let valid = true
      props.user.points.forEach((elem, index) => {
        if (elem.title === title && index !== props.index) {
          setInvalid('Точка с таким названием уже есть')
          valid = false
        }
      });

      if (valid) {
        setInvalid('')
        let points = props.user.points
  
        points[props.index] = { title, latitude, longitude }
  
        await request('/api/setPoints', 'POST', { token: props.user.token, points })
        props.getUserHandler()
        setTitle('')
        setLatitude('')
        setLongitude('')
        props.setModalEditPoint()
      }

    } catch (e) { console.log(e) }
  }

  return (
    <div id = 'modal' style = { modalStyle } onClick = { (event) => { 
      if (event.target.id === 'modal') {
        props.setModalEditPoint()
      }
    } }>
      <div className = 'grey darken-4 teal-text' style = {{ padding: '20px 20px' }}>
        <form
          className = 'col s10 offset-s1'
          onSubmit = { event => onSubmit(event) }
        >
          <div className="row">
            <h5 style = {{ color: '#4db6ac', textAlign: 'center' }}> Изменить точку на карте </h5>
            <div className="input-field col s12">
              <input 
                id="titleEdit"
                type="text" 
                className="validate white-text" 
                value = { title }
                onChange = { event => setTitle(event.target.value) }
              />
              <label htmlFor="titleEdit" className="active"> Название </label>
            </div>
          </div>

          <div className="row">

            <div className="input-field col s6">
              <input 
                id="latitudeEdit"
                type="number" 
                className="validate white-text" 
                value = { latitude }
                onChange = { event => setLatitude(event.target.value) }
              />
              <label htmlFor="latitudeEdit" className="active">Широта</label>
            </div>

            <div className="input-field col s6">
              <input 
                id="longitudeEdit"
                type="number" 
                className="validate white-text" 
                value = { longitude }
                onChange = { event => setLongitude(event.target.value) }
              />
              <label htmlFor="longitudeEdit" className="active">Долгота</label>
            </div>

          </div>
          <p style = {{ color: 'tomato', textAlign: 'center' }}> { invalid } </p>
          <div style = {{ display: 'flex', justifyContent: 'center' }}>
            <button 
              className="waves-effect waves-light btn" 
              style = {{ marginRight: '15px' }}
            > Изменить </button>

            <button 
              className="waves-effect waves-light btn" 
              onClick = { () => props.setModalEditPoint('') }
            > Отмена </button>

          </div>
        </form>
      </div>
    </div>
  )
} 