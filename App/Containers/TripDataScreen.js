import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'


import Colors from '../Themes/Colors'

import RentalFormPage3 from '../Components/RentalFormPages/RentalFormPage3'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TripDataScreenStyle'

class TripDataScreen extends Component {
  static navigationOptions = {
    title: 'DATOS DEL RECORRIDO',
  }

  _next = () =>{
    const {navigate} = this.props.navigation;
    const {errors} = this.props
    if(!errors)
      navigate('LobbyScreen')
  }
  render () {
    const {navigate} = this.props.navigation;
    return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <RentalFormPage3 
        nextPage={this._next}
        cancel={() => navigate('SelectCarScreen')}
        />
      </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.form.rental_form &&
    state.form.rental_form.syncErrors?state.form.rental_form.syncErrors:null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDataScreen)