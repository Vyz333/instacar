import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import LinearGradient from 'react-native-linear-gradient';


import Colors from '../Themes/Colors'

import RentalFormPage4 from '../Components/RentalFormPages/RentalFormPage4'
import APIKeys from '../Config/APIKeys'

// Add Actions - replace 'Your' with whatever your reducer is called :)
 import RentalFormActions from '../Redux/RentalFormRedux'
 import AuthenticationActions from '../Redux/AuthenticationRedux'

// Styles
import styles from './Styles/LobbyScreenStyle'

class LobbyScreen extends Component {
  constructor(props){
    super(props)

  }
  componentDidMount() {
    if(this.props.order)
      this.handleOrder()
  }
  static navigationOptions = {
    title: 'CONFIRMACIÓN',
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

  buildOrder = () => {
    const {order,cars_catalogue,auth} = this.props
    if(order){
      const car_t = ['sedan','suv','passengers']
      const model = cars_catalogue[order.car.cat][order.car.idx]
      const wp_order = {
        title: order.email+'_'+Math.floor(Date.now() / 1000),
        email: order.email,
        car_type:[car_t[order.car.cat]],
        //Delivery Itinerary
        addr_delivery: order.delivery_address.address,
        latitude_delivery:order.delivery_address.latitude,
        longitude_delivery:order.delivery_address.longitude,
        datetime_delivery: order.delivery_datetime,
        //Return Itinerary
        addr_return: order.return_address.address,
        latitude_return:order.return_address.latitude,
        longitude_return:order.return_address.longitude,
        datetime_return: order.return_datetime,
        current_status: '1',
        car_model: model.title,
        driver: order.driver.value,
        trip_type:order.trip_type,
        current_status:0,

        token:auth.token,
        status:'publish',
      }
      return wp_order
    }else{
      return null
    }
  }
  
  handleOrder = async () =>{
    if(this.props.auth && !this.props.rental_error){
      await this.props.postOrder(this.buildOrder())
      if(this.props.rental_error){
        await this.props.loginUser({username:APIKeys.username,password:APIKeys.password})
        this.props.postOrder(this.buildOrder())
      }
    }else{
      await this.props.loginUser({username:APIKeys.username,password:APIKeys.password})
      this.props.postOrder(this.buildOrder())
    }
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
      <View style={styles.container}>
        { this.gradient }
        <RentalFormPage4
        nextPage={() => navigate('SelectCarScreen')}
        cancel={() => navigate('SelectCarScreen')}
        />
      </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.form.rental_form?state.form.rental_form.values:{},
    auth: state.auth.payload?state.auth.payload:{},
    cars_catalogue: state.rental.cars,
    rental_error: state.rental.error,
  }
}
const mapDispatchToProps = (dispatch) => ({
  postOrder: (order) => dispatch(RentalFormActions.postOrderRequest(order)),
  loginUser: (user) => dispatch(AuthenticationActions.loginUserRequest(user)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LobbyScreen)
