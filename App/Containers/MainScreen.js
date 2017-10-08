import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView,Modal } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect, bindActionCreators } from 'react-redux'

import Header from '../Components/AppHeader'
import RentalForm from '../Components/RentalForm'
//import LoginModal from '../Components/Modals/LoginModal'
import Colors from '../Themes/Colors'
import AppConfig from '../Config/AppConfig'
import styles from './Styles/MainScreenStyle'

import AuthenticationActions from '../Redux/AuthenticationRedux'

class MainScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      modalMode:0//0=>Not visible, 1=>Login Modal
    }
  }

  login=()=>{
    const {username,password} = this.props.order
    console.log("logging in as "+username)
    this.props.loginAction({username,password})
  }
  register=()=>{
    const {username,password} = this.props.order
    console.log("registering "+username)
    this.props.registerAction({username,password})
  }
  postOrder=(order)=>{

  }
  render () {
    return (
      
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {/*<RentalForm onLogin={this.login} onRegister={this.register} onPostOrder={this.postOrder}/>
           <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalMode!=0}
          onRequestClose={() => {}}
          >
          <LoginModal onLogin={this.login} onRegister={this.register} />
          </Modal> */}
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.form.rental_form?state.form.rental_form.values:{},
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginAction: (user) => dispatch(AuthenticationActions.loginUserRequest(user)),
  registerAction: (user) => dispatch(AuthenticationActions.createUserRequest(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)