import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay'
import APIKeys from '../Config/APIKeys'
import UserDataForm from '../Components/UserDataForm'



// Actions
import AuthenticationActions from '../Redux/AuthenticationRedux'

import Colors from '../Themes/Colors'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CompleteUserScreenStyle'

class CompleteUserScreen extends Component {
  _buildLogin = () =>{
    const {authData} = this.props
    const wp_user = {
      username: authData.email,
      password: authData.password,
    }
    return wp_user
  }
  _buildRegister = () =>{
    const {authData} = this.props
    const wp_user = {
      username: authData.email,
      name: authData.name,
      email: authData.email,
      password: authData.password,
      phone: authData.phone
    }
    return wp_user
  }
  _onLogin = () =>{
    const {loginAction, authData} = this.props
    if(!authData.syncErrors){
      loginAction(this._buildLogin()) 
      this._next()
    }
  }
  _next = () => {
    const {navigate} = this.props.navigation
    navigate('DocumentsUploadScreen')
  }

  _onRegister = async () =>{
    const {registerAction, loginAction, authData, auth, auth_error} = this.props
    if(!authData.syncErrors){
      registerAction(this._buildRegister())
      loginAction(this._buildLogin()) 
      this._next()
    }
  }

  render () {
    const {loginAction,registerAction,register,authData, loading} = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Spinner visible={loading} textStyle={{color: Colors.primaryDark}} />
          { this.gradient }
          {<UserDataForm 
          onLogin={this._onLogin} 
          onRegister={this._onRegister} 
          register={register}
          />}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    register: state.form.auth&&
      state.form.auth.values&&
      state.form.auth.values.register?state.form.auth.values.register:true,

    authData:state.form.auth&&
      state.form.auth.values?state.form.auth.values:{},

    auth: state.auth.payload?state.auth.payload:{},
    loading: state.auth.fetching,
    auth_error : state.auth.error,
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginAction: (user) => dispatch(AuthenticationActions.loginUserRequest(user)),
  registerAction: (user) => dispatch(AuthenticationActions.createUserRequest(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompleteUserScreen)
