import React, { Component } from 'react'
import { Marker } from 'react-native-maps'
import Geocoder from 'react-native-geocoder'

import {
  InteractionManager,
} from 'react-native'


// Images
const markerIcon = require('../../Images/marker.png')


const LATITUDE_DELTA = 0.0122


export default class MapMixin extends Component {
  state = {
    passengerPosition: {
      latitude: 0,
      longitude: 0,
    },

    pickupPosition: null,

    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },

    drivers: [],

    isReady: false,
  }

  // watchId: ?number = null

  constructor(props) {
    super(props)
    this.onRegionChange = this._onRegionChange.bind(this)
    this.latitudeDelta = LATITUDE_DELTA
    this.longitudeDelta = LATITUDE_DELTA
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(_ => {
      setTimeout(() => {
        this.renderMap()
        InteractionManager.runAfterInteractions(_ => {
          setTimeout(() => {
            this.watchPassenger()
            this.watchDrivers()
          }, 100)
        })
      }, 1000)
    })
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID)
  // }

  renderMap() {
    this.setState({isReady: true})
  }

  watchDrivers() {
    const onChildChange = (data) => {
      const position = data.val().position

      let drivers = this.state.drivers,
          found = false

      this.state.drivers.forEach((driver, i) => {
        if (driver.id === data.key) {
          found = true
          drivers[i].position = position
        }
      })

      if (!found) {
        drivers.push({
          id: data.key,
          position: position,
        })
      }

      this.setState({drivers})
    }
  }

  // watchPassenger() {
  //   const positionOptions = {
  //     enableHighAccuracy: true,
  //     timeout: 20000,
  //     maximumAge: 1000,
  //   }

  //   this.watchID = navigator.geolocation.watchPosition(pos => (
  //     this.onChangePosition(pos.coords)
  //   ), positionOptions)
  // }

  onChangePosition(coords) {
    const passengerPosition = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    }

    this.updatePassengerPosition(passengerPosition)
    this.updateRegion()
    this.updateAddress()
  }

  updatePassengerPosition(passengerPosition) {
    this.setState({passengerPosition})
    user.update({passengerPosition})
  }

  updateRegion() {
    let region = {
      latitude: this.state.passengerPosition.latitude,
      longitude: this.state.passengerPosition.longitude,
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta,
    }

    this.setState({region})
  }

  updateAddress() {
    const pos = {
      lat: this.state.passengerPosition.latitude,
      lng: this.state.passengerPosition.longitude,
    }

    Geocoder.geocodePosition(pos).then(res => {
      if (res.length > 0) {
        this.setState({address: res[0].feature})
      }
    }).catch(err => console.log(err))
  }

  _onRegionChange(region) {
    if (this.state.passengerPosition.latitude !== 0) {
      this.setState({region})
    }
  }

  renderPickupPosition() {
    const coordinate = this.state.pickupPosition || this.state.passengerPosition

    return <Marker draggable image={markerIcon} 
                   coordinate={coordinate}
                   centerOffset={{x: 0, y: -33}}
                   onDragEnd={this.onDragEnd} />
  }

  renderPassengerPosition() {
    return <Marker draggable image={dotIcon} 
                   coordinate={this.state.passengerPosition}
                   onDragEnd={this.onDragEnd} />
  }

  renderDrivers() {
    return this.state.drivers.map(driver => (
      <Marker key={driver.id} coordinate={driver.position}
              image={carIcon} style={{flex: 1, width: 20, height: 20}} />
    ))
  }
}