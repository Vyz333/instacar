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
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount(){
    const {fetchCars,cars,navigation} = this.props
    fetchCars()
    while(!cars){
      setTimeout(()=>{}, 100);
    }
    console.log(cars)
    navigation.navigate('SelectCarScreen')
  }
  
}
const mapStateToProps = (state) => {
  return {
    cars: state.rental.cars,
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCars: () => dispatch(RentalFormActions.carsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)