import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import LinearGradient from 'react-native-linear-gradient';


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
  get gradient () {
    return (
        <LinearGradient
          colors={[Colors.silver, Colors.frost]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
    );
  }
  _next = () =>{
    const {navigate} = this.props.navigation;
    const {errors} = this.props
    if(!errors)
      navigate('TripDataScreen')
  }
  render () {
    const {navigate} = this.props.navigation;
    return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        { this.gradient }
        <RentalFormPage3 
        nextPage={() => navigate('LobbyScreen')}
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