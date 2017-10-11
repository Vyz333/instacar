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
 import FormatOrder from '../Transforms/FormatOrder'

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
      const model = cars_catalogue[order.currentCar.cat][order.currentCar.idx]
      return FormatOrder(order,model,auth,Math.floor(Date.now() / 1000))
      return wp_order
    }else{
      return null
    }
  }
  buildMultiOrders  = (groupTimeStamp)=>{
    const {order,cars_catalogue,auth,inventory} = this.props
    let orders = []
    if(order){
      for(let item of inventory){
        let model = cars_catalogue[item.cat][item.idx]
        orders.push(FormatOrder(order,model,auth,groupTimeStamp))
      }
      return orders
    }else{
      return null
    }
  }
  handleOrder = () =>{
    const {order,inventory} = this.props
    console.log(inventory,order)
    if(order.multiple && inventory){
      this.handleMultiOrder()
    }else{
      this.handleSingleOrder()
    }
  }

  handleSingleOrder = () =>{
    this.props.postOrder([this.buildOrder()])
    
  }
  handleMultiOrder = () =>{
    const orders = this.buildMultiOrders(Math.floor(Date.now() / 1000))
    console.log(orders)
    this.props.postOrder(orders)
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
      <View style={styles.container}>
        { this.gradient }
        <RentalFormPage4
        nextPage={() => navigate('CompleteUserScreen')}
        cancel={() => navigate('SelectCarScreen')}
        status={this.props.status}
        />
      </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.form.rental_form?state.form.rental_form.values:{},
    inventory: state.rental.inventory,
    auth: state.auth.payload?state.auth.payload:{},
    cars_catalogue: state.rental.cars,
    rental_error: state.rental.error,
    status: state.orders.status?state.orders.status:0,
  }
}
const mapDispatchToProps = (dispatch) => ({
  postOrder: (order) => dispatch(RentalFormActions.postOrderRequest(order)),
  loginUser: (user) => dispatch(AuthenticationActions.loginUserRequest(user)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LobbyScreen)
