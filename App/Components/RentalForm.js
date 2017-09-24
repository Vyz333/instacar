import React, { Component } from 'react'
import {View, Text,Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable'
import { connect, bindActionCreators } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import styles from './Styles/RentalFormStyle'
import Colors from '../Themes/Colors'
import RentalFormPage1 from './RentalFormPages/RentalFormPage1'
import RentalFormPage2 from './RentalFormPages/RentalFormPage2'
import PaymentForm1 from './RentalFormPages/PaymentForm1'
import LoginForm from './RentalFormPages/LoginForm'
import RegistrationForm1 from './RentalFormPages/RegistrationForm1'
import RegistrationForm2 from './RentalFormPages/RegistrationForm2'
import RegistrationForm3 from './RentalFormPages/RegistrationForm3'
import BillForm from './RentalFormPages/BillForm'
import OrderList from './RentalFormPages/OrderList'

import RentalFormActions from '../Redux/RentalFormRedux'

class RentalForm extends Component {
  constructor(props) {
    super(props)
    if(!this.props.cars)this.props.fetchCars()
    this.nextPage = this.nextPage.bind(this)
    this.doLogin = this.doLogin.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this._getCarsArray = this._getCarsArray.bind(this)
    this._postOrder = this._postOrder.bind(this)
    this.state = {
      page: 7
    }
  }
  
  doLogin(username,password){
    this.props.login(username,password)
    this.setState({ page: 7 })
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  gotoRegistration(){
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

  render () {
    const { onSubmit,cars,order,onLogin,onRegister,onPostOrder } = this.props
    const { page } = this.state

    return (
      <View style={{flex:1}}>
      {cars &&
      <View style={{flex:1}}>
        { this.gradient }

        {page === 1 && <RentalFormPage1 cars={this._getCarsArray(cars)} nextPage={this.nextPage}/>}
        {page === 2 && <RentalFormPage2 previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 3 && <LoginForm previousPage={this.previousPage} doLogin={onLogin} gotoRegistration={this.nextPage}/>}
        {page === 4 && <RegistrationForm1 previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 5 && <RegistrationForm2 previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 6 && <RegistrationForm3 previousPage={this.previousPage} nextPage={this.nextPage/*onRegister*/}/>}
        {page === 7 && <PaymentForm1 previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 8 && <BillForm previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 9 && <OrderList previousPage={this.previousPage} nextPage={this.nextPage}/>}
        
     </View>}
     </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cars: state.rental.cars,
    order: state.form.rental_form?state.form.rental_form.values:{},
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCars: () => dispatch(RentalFormActions.carsRequest()),
  postOrder: (order) => dispatch(RentalFormActions.postOrderRequest(order)),
})
export default connect(mapStateToProps, mapDispatchToProps)(RentalForm)
