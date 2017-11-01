import React, { Component } from 'react'
import {View, Text,Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable'
import { connect, bindActionCreators } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import StepIndicator from 'react-native-step-indicator';

import styles from './Styles/RentalFormStyle'
import Colors from '../Themes/Colors'
import RentalFormPage1 from './RentalFormPages/RentalFormPage1'
import RentalFormPage2 from './RentalFormPages/RentalFormPage2'
import PaymentForm1 from './RentalFormPages/PaymentForm1'
import FilesUpload from './RentalFormPages/FilesUpload'
import BillingForm from './RentalFormPages/BillingForm'
import OrderList from './RentalFormPages/OrderList'

import RentalFormActions from '../Redux/RentalFormRedux'
import { RentalFormTypes } from '../Redux/RentalFormRedux'
import { AuthenticationTypes } from '../Redux/AuthenticationRedux'

class RentalForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    header:<Header icon={'arrow-back'} title={'INSTACAR'} buttonCallback={console.log("head2")}/>,
  });
  constructor(props) {
    super(props)
    if(!this.props.cars)this.props.fetchCars()
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this._getCarsArray = this._getCarsArray.bind(this)
    this._postOrder = this._postOrder.bind(this)
    this.state = {
      page: 1
    }
  }
  
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }
  _buildOrder(){
    const v = this.props.order
    console.log(this.props)
    const car_t = ['sedan','suv','passengers']
    const order = {
      car_type:[car_t[v.car.cat]],
      addr_delivery: v.delivery_address.place_id,
      addr_return: v.return_address.place_id,
      datetime_delivery: v.delivery_datetime,
      datetime_return: v.return_datetime
    }
    return order
  }
  _postOrder(order){
    //this.props.postOrder(this._buildOrder(order))
    order = _buildOrder()
    wp.posts().create({
      // "title" and "content" are the only required properties 
      title: 'Your Post Title',
      content: 'Your post content',
      // Post will be created as a draft by default if a specific "status" 
      // is not specified 
      status: 'publish'
  }).then(function( response ) {
      // "response" will hold all properties of your newly-created post, 
      // including the unique `id` the post was assigned on creation 
      console.log( response.id );
  })
  }
  _getCarsArray(cars){
    console.log(cars)
    let SEDANS = []
    let SUVS = []
    let PASSENGER_CARS = []
    for(let car of cars){
      let vehicle = {
        title:car.title.rendered,
        subtitle:car.n_doors+' puertas',
        transmission: car.automatic==1?'automático':'estandar',
        rate:car.hourly_rate,
        illustration: car.car_picture.guid,
      }
      switch(car.car_type[0]){
        case 'sedan':
          SEDANS.push(vehicle)
          break
        case 'suv':
          SUVS.push(vehicle)
          break
        case 'passengers':
          PASSENGER_CARS.push(vehicle)
          break
      }
    }
    return [SEDANS,SUVS,PASSENGER_CARS]
  }

  // Prop type warnings
  /*static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }*/
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
  get formPages(){
    const { onSubmit,cars,order,onLogin,onRegister,onPostOrder } = this.props
    const { page } = this.state
    switch(page){
      case 1:return <RentalFormPage1 cars={this._getCarsArray(cars)} nextPage={this.nextPage}/>
      case 2:return <RentalFormPage2 previousPage={this.previousPage} nextPage={this.nextPage}/>
      case 3:return <RegistrationForm3 previousPage={this.previousPage} nextPage={this.nextPage/*onRegister*/}/>
      case 4:return <BillingForm previousPage={this.previousPage} nextPage={this.nextPage}/>
      case 5:return <PaymentForm1 previousPage={this.previousPage} nextPage={this.nextPage}/>
      case 6:return <OrderList previousPage={this.previousPage} nextPage={this.nextPage}/>
    }
  }
  render () {
    const { onSubmit,cars,order,onLogin,onRegister,onPostOrder } = this.props
    const { page } = this.state
    return (
      <View style={{flex:1}}>
      {cars &&
      <View style={{flex:1}}>
        { this.gradient }
        { this.formPages}
        
     </View>}
     </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cars: state.rental.cars,
    order: state.form.rental_form?state.form.rental_form.values:{},
    auth: state.auth.payload?state.auth.payload:{}
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCars: () => dispatch(RentalFormActions.carsRequest()),
  postOrder: (order) => dispatch(RentalFormActions.postOrderRequest(order)),
})
export default connect(mapStateToProps, mapDispatchToProps)(RentalForm)
