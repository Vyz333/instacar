import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
import validate from './RentalFormPage1Validation'
import {
  ActionsContainer,
  FieldsContainer,
  Fieldset,
  FormGroup,
  FieldSet,
  Form,
  Label
} from 'react-native-clean-form'
import {
  Input,
  Select,
  Switch
} from 'react-native-clean-form/redux-form-immutable'
import {Sae} from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View,Text,Dimensions,Platform } from 'react-native'
import {ButtonGroup, Card,Button,SocialIcon,FormLabel, FormInput} from 'react-native-elements'
import {Button as FButton} from 'react-native-clean-form'

import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'
class RentalFormPage4 extends Component {
  constructor (props) {
    super(props);


  }
  _onUsernameChange(){
    
  }
  _onPasswordChange(){
    
  }
  render () {
    const {     
      handleSubmit,
      previousPage, 
    } = this.props


    return (
    <View style={{flex:1}}>
    <Form onSubmit={handleSubmit}>  
      <FormLabel>Correo</FormLabel>
      <FormInput onChangeText={this._onUsernameChange}/>
      <FormLabel>Contraseña</FormLabel>
      <FormInput onChangeText={this._onPasswordChange}/>
    <View style={{flex:5,marginTop:60,flexDirection: 'column',
        justifyContent: 'space-around'}}>
        <View style={{flex:1}}>
      
        <SocialIcon
          title='Iniciar Sesión con Facebook'
          button
          type='facebook'
        />

        <SocialIcon
          title='Iniciar Sesión con Twitter'
          button
          type='twitter'
        />
        
        </View>

        </View>
        <ActionsContainer>
            <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} type="submit" className="next">Iniciar Sesión</FButton>
        </ActionsContainer>        
        <ActionsContainer>
            <FButton onPress={handleSubmit} theme={Theme} type="submit" className="next">Crear Nueva Cuenta</FButton>
        </ActionsContainer>
      </Form>
      </View>
    )
  }
}

export default reduxForm({
  form: 'rental_form',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(RentalFormPage4)