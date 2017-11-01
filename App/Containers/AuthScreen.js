import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay'
import APIKeys from '../Config/APIKeys'
import LoginForm from '../Components/LoginForm'



// Actions
import AuthenticationActions from '../Redux/AuthenticationRedux'


// Styles
import styles from './Styles/AuthScreenStyle'
import Colors from '../Themes/Colors'

class AuthScreen extends Component {
  static navigationOptions = {
    headerLeft: null,
  }
  componentWillReceiveProps(nextProps){
    const {auth,loading,auth_error} = nextProps
    const {navigate} = this.props.navigation
    if(!loading && auth && auth.token && auth.username!='service'){
      console.log(auth)
      navigate('OrdersListScreen')
    }else{
      console.log(auth)
    }
  }
  _buildLogin = () =>{
    const {authData,auth} = this.props
    console.log(authData)
    const wp_user = {
      username: authData.email,
      password: authData.password,
    }
    return wp_user
  }
  _buildRegister = () =>{
    const {authData,auth} = this.props
    console.log(auth,authData)
    const wp_user = {
      username: authData.email,
      name: authData.name,
      email: authData.email,
      password: authData.password,
      roles:['renter'],
      token:auth.token,
    }
    return wp_user
  }
  _onLogin = () =>{
    const {loginAction, authData} = this.props
    if(!authData.syncErrors){
      loginAction(this._buildLogin()) 
    }
  }

  _onRegister = async () =>{
    const {registerAction, loginAction, authData, auth, auth_error} = this.props
    if(!authData.syncErrors){
      registerAction(this._buildRegister())
    }
  }
  render () {
    const {loginAction,registerAction,register,authData, loading,auth_error_msg} = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Spinner visible={loading} textStyle={{color: Colors.primaryDark}} />
          { this.gradient }
          {<LoginForm 
          onLogin={this._onLogin} 
          onRegister={this._onRegister} 
          register={register}
          errors={auth_error_msg}
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
      state.form.auth.values.register?state.form.auth.values.register:false,

    authData:state.form.auth&&
      state.form.auth.values?state.form.auth.values:{},

    auth: state.auth.payload?state.auth.payload:{},
    loading: state.auth.fetching,
    auth_error : state.auth.error,
    auth_error_msg : state.auth.error_msg,
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginAction: (user) => dispatch(AuthenticationActions.loginUserRequest(user)),
  registerAction: (user) => dispatch(AuthenticationActions.createUserRequest(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)