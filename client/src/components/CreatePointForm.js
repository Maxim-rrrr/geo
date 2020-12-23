import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const CreatePointForm = (props) => {
  const [title, setTitle] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [invalid, setInvalid] = useState('')

  const { request } = useHttp()

  const onSubmit = async event => {
    event.preventDefault()

    try {
      let valid = true
      props.user.points.forEach(elem => {
        if (elem.title === title) {
          setInvalid('Точка с таким названием уже есть')
          valid = false
        }
      });

      if (valid) {
        setInvalid('')
        let points = props.user.points
  
        points.push({ title, latitude, longitude })
  
        await request('/api/setPoints', 'POST', { token: props.user.token, points })
        props.getUserHandler()
        setTitle('')
        setLatitude('')
        setLongitude('')
      }

    } catch (e) { console.log(e) }
  }

  return (
    <form
      className = 'col s10 offset-s1'
      onSubmit = { event => onSubmit(event) }
    >
      <div className="row">
        <h5 style = {{ color: '#4db6ac', textAlign: 'center' }}> Добавить точку на карту </h5>
        <div className="input-field col s12">
          <input 
            id="title"
            type="text" 
            className="validate white-text" 
            value = { title }
            onChange = { event => setTitle(event.target.value) }
          />
          <label htmlFor="title"> Название </label>
        </div>
      </div>

      <div className="row">

        <div className="input-field col s6">
          <input 
            id="latitude"
            type="number" 
            className="validate white-text" 
            value = { latitude }
            onChange = { event => setLatitude(event.target.value) }
          />
          <label htmlFor="latitude">Широта</label>
        </div>

        <div className="input-field col s6">
          <input 
            id="longitude"
            type="number" 
            className="validate white-text" 
            value = { longitude }
            onChange = { event => setLongitude(event.target.value) }
          />
          <label htmlFor="longitude">Долгота</label>
        </div>

      </div>
      <p style = {{ color: 'tomato', textAlign: 'center' }}> { invalid } </p>
      <button className="waves-effect waves-light btn" style = {{display: 'block', margin: 'auto'}}> Добавить </button>
    </form>
  )
}