import React, { Component } from 'react'
import {View, Text,Dimensions, 
  ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import Colors from '../Themes/Colors'

import RentalFormPage2 from '../Components/RentalFormPages/RentalFormPage2'
// Actions
import RentalFormActions from '../Redux/RentalFormRedux'

// Styles
import styles from './Styles/ItineraryScreenStyle'

class ItineraryScreen extends Component {
  static navigationOptions = {
    title: 'DATOS DE RESERVACION',
  }
  _next = () =>{
    const {navigate} = this.props.navigation;
    const {errors} = this.props
    if(!errors)
      navigate('TripDataScreen')
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {<RentalFormPage2 nextPage={this._next}/>}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.form.rental_form && state.form.rental_form.syncErrors?state.form.rental_form.syncErrors:null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryScreen)