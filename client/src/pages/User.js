import React, { useState } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import { CreatePointForm } from '../components/CreatePointForm'
import { PointEditModal } from '../components/PointEditModal'
import { PointRemoveModal } from '../components/PointRemoveModal'


export const User = (props) => {
  const [coords, setCoords] = useState([])
  const [modalEditPoint, setModalEditPoint] = useState()
  const [modalRemovePoint, setModalRemovePoint] = useState()

  window.onload = function() {
    navigator.geolocation.getCurrentPosition(position => setCoords([position.coords.latitude, position.coords.longitude]))
  }

  return (
    <>
      <button 
        className = 'btn' 
        style = {{ position: 'fixed', top: '15px', right: '15px', zIndex: '2501' }}
        onClick = { () => { 
          localStorage.removeItem('token')
          document.location.reload()
        }}
      > 
        Выйти 
      </button>
      <div className = 'row'>
        <div className="col s3 grey darken-4" style = {{height: '100vh'}}>
          <div className="row">
            <div className="col s12">
              <CreatePointForm user = { props.user } getUserHandler = {() => { props.getUserHandler() } }/>
            </div>
            
            <div className="col s12">
              <div className="points" style = {{ overflowY: 'scroll', height: '60vh', marginTop: '5vh' }}>
                
                {
                  props.user.points.map((elem, index) => { 
                    return (
                      <div 
                        class="card blue-grey darken-1" 
                        key = { index }
                        style = {{ cursor: 'pointer' }}
                        onClick = { () => { setCoords([elem.latitude, elem.longitude]) } }
                      >
                        <div class="card-content white-text">
                          <span class="card-title"> { elem.title } </span>
                          <h6 className="white-text">
                          Широта: { elem.latitude }
                          </h6>
                          <h6 className="white-text">
                            Долгота: { elem.longitude }
                          </h6>
                        </div>
                        <div class="card-action">
                          <button 
                            className="waves-effect waves-light btn amber-text" 
                            style = {{ marginRight: '15px', position: 'static' }}
                            onClick = { () => { setModalEditPoint(index) }}
                          > Изменить </button>

                          <button 
                            className="waves-effect waves-light btn amber-text"
                            style = {{ position: 'static' }}
                            onClick = { () => { setModalRemovePoint(index) }}
                          > Удалить </button>

                        </div>
                      </div>
                    )
                  })
                }
                
              </div>
            </div>
          </div>
        </div>

        <div className="col s9" style = {{ padding: 0 }}>
          <YMaps>
            <div>
              <Map 
                state = {{ center: coords, zoom: 9 }} 
                defaultState = {{ center: coords, zoom: 9 }} 
                width = '100%'
                height = '105vh'
              >
                {
                  props.user.points.map(elem => { 
                    return <Placemark 
                      geometry = {[elem.latitude, elem.longitude]}
                      defaultProperties = {{
                        balloonContent: elem.title 
                      }}
                      modules = {
                        ['geoObject.addon.balloon']
                      }
                    />
                  })
                }
                
              </Map>
            </div>
          </YMaps>
        </div>
      </div>
      
      {
        modalEditPoint + 1 &&
        <PointEditModal 
          index = { modalEditPoint } 
          user = { props.user } 
          getUserHandler = { () => { props.getUserHandler() } }
          setModalEditPoint = { () => { setModalEditPoint() } }
        />
      }

      {
        modalRemovePoint + 1 &&
        <PointRemoveModal 
          index = { modalRemovePoint } 
          user = { props.user } 
          getUserHandler = { () => { props.getUserHandler() } }
          setModalRemovePoint = { () => { setModalRemovePoint() } }
        />
      }
      
    </>
  )
}