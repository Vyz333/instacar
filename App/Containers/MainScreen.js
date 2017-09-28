import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect, bindActionCreators } from 'react-redux'
import WPAPI from 'wpapi'

import RentalForm from '../Components/RentalForm'
import Colors from '../Themes/Colors'
import AppConfig from '../Config/AppConfig'
import styles from './Styles/MainScreenStyle'
import WpActions from '../Redux/WpRedux'
import AuthenticationActions from '../Redux/AuthenticationRedux'

const wp = new WPAPI({ 
  endpoint: AppConfig.WPUrl,
  username: 'admin',
  password: 'instacar',
});

class MainScreen extends Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.postOrder = this.postOrder.bind(this)
    wp.posts().then(function( data ) {
      console.log(data)
    }).catch(function( err ) {
      console.log(err)
        // handle error 
    });
  }

  login(){
    console.log("Dologin called")
    const {username,password} = this.props.order
    this.props.loginAction({username,password})
    //this.props.login({username,password}).then(function (response){

    //})
    //this.setState({ page: 7 })
  }
  register(){
    console.log(this.props)
    const v = this.props.order
    console.log(v)
    wp.users().create({
      username:v.username,
      first_name:v.firstName,
      last_name:v.lastName,
      email:v.username,
      password:v.password,
  }).then(function( response ) {
    // wp.media()
    // .file( '../Images/ine.jpg' )
    // .create({
    //     title: 'v.username_ine',
    //     alt_text: 'ine',
    // })
    // .then(function( response ) {
    //     // Your media is now uploaded: let's associate it with a post 
    //     var newImageId = response.id;
    //     return wp.media().id( newImageId ).update({
    //         post: associatedPostId
    //     });
    // })
    // .then(function( response ) {
    //     console.log( 'Media ID #' + response.id );
    //     console.log( 'is now associated with Post ID #' + response.post );
    // });
      
      console.log( response.id );
  })
  }
  postOrder(order){

  }
  render () {
    return (
      
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <RentalForm onLogin={this.login} onRegister={this.register} onPostOrder={this.postOrder}/>
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
  loginAction: (user) => dispatch(AuthenticationActions.loginUserRequest(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)