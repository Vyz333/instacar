import React,{Component} from 'react'
import {connect} from 'react-redux'
import { ScrollView, Text, Image, View } from 'react-native'
import RentalFormActions from '../Redux/RentalFormRedux'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount(){
    const {fetchCars,cars,navigation,opened_from_tray} = this.props
    fetchCars()
    while(!cars){
      setTimeout(()=>{}, 100);
    }
    
    navigation.navigate('SelectCarScreen')
    //navigation.navigate('AuthScreen')
  }
  
}
const mapStateToProps = (state) => {
  return {
    cars: state.rental.cars,
    notification: state.notif.notification,
    opened_from_tray: state.notif.notification?state.notif.notification.opened_from_tray:false,
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCars: () => dispatch(RentalFormActions.carsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)