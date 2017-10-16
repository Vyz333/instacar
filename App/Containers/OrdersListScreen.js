import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import OrdersListView from '../Components/OrdersListView'
import FCM from 'react-native-fcm'
import Spinner from 'react-native-loading-spinner-overlay'

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
  }
  componentWillMount(){
    this.fetchProcess = this.fetchOrders();
  }
  componentWillReceiveProps(nextProps){
    this._checkAuth(nextProps)
  }

  _checkAuth = (props) => {
    const {auth} = props
    const {navigate} = this.props.navigation
    if(!auth || !auth.token || auth.username=='service'){
      console.log(auth)
      navigate('AuthScreen')
    }
  }
  _acceptOrder = (item) =>{
    const {acceptOrder,auth} = this.props
    acceptOrder({id:item.id,token:auth.token,renter:auth.id,order_token:item.notif_token})
    this.props.getAllOrders;
  }
  _declineOrder = (item) =>{
    
  }
  componentWillUnmount(){
    clearInterval(this.fetchProcess);
  }
  fetchOrders= () =>{
    this.props.getAllOrders;
    setInterval(this.props.getAllOrders, 8000);
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
    //console.log(this.props)
    const {all_orders,auth} = this.props
    const {navigate} = this.props.navigation;
    const loading = !all_orders||all_orders.length <1;
    console.log(all_orders)
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          { this.gradient }
          <Spinner visible={loading} textStyle={{color: Colors.primaryDark}} />
          <OrdersListView orders={all_orders} 
          auth={auth}
          acceptOrder={this._acceptOrder} 
          declineOrder={this._declineOrder} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    all_orders: state.orders?state.orders.orders:[],
    auth: state.auth.payload?state.auth.payload:{},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => dispatch(OrdersActions.ordersRequest()),
    acceptOrder: (data) => dispatch(OrdersActions.acceptOrderRequest(data)),
    declineOrder: (data) => dispatch(OrdersActions.declineOrderRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListScreen)
