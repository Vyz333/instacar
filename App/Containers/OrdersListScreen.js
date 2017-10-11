import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import OrdersListView from '../Components/OrdersListView'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import OrdersActions from '../Redux/OrdersRedux'

// Styles
import styles from './Styles/OrdersListScreenStyle'
import Colors from '../Themes/Colors'
import LinearGradient from 'react-native-linear-gradient';
class OrdersListScreen extends Component {
  constructor(props){
    super(props)
    this._checkAuth(props)
    this.fetchProcess = this.fetchOrders();
  }

  componentWillReceiveProps(nextProps){
    this._checkAuth(nextProps)
  }

  _checkAuth = (props) => {
    const {auth} = props
    const {navigate} = this.props.navigation
    if(!auth || !auth.token || auth.username=='service'){
      navigate('AuthScreen')
    }
  }
  _acceptOrder = (id) =>{
    const {acceptOrder} = this.props
    acceptOrder(id,auth.token)
  }
  _declineOrder = () =>{
    
  }
  componentWillUnmount(){
    clearInterval(this.fetchProcess);
  }
  fetchOrders= () =>{
    setInterval(this.props.getAllOrders, 5000);
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

  render () {
    console.log(this.props)
    const {all_orders,acceptOrder,declineOrder} = this.props
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          { this.gradient }
          <OrdersListView orders={all_orders} 
          acceptOrder={acceptOrder} 
          declineOrder={declineOrder} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    all_orders: state.orders?state.orders.payload:[],
    auth: state.auth.payload?state.auth.payload:{},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => dispatch(OrdersActions.ordersRequest()),
    acceptOrder: (id,token) => dispatch(OrdersActions.acceptOrderRequest(id,token)),
    declineOrder: (id,token) => dispatch(OrdersActions.declineOrderRequest(id,token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListScreen)
