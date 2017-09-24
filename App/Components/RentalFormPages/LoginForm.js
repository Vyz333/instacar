import React,{ Component } from 'react'
import { Field,reduxForm } from 'redux-form/immutable'
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

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View,Text,Dimensions,Platform,TouchableOpacity } from 'react-native'
import {ButtonGroup, Card,Button,SocialIcon,FormLabel, FormInput} from 'react-native-elements'
import {Button as FButton} from 'react-native-clean-form'

import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'
const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <FormInput style={styles.input} onChangeText={onChange} {...restInput} />
}
const renderPasswordInput = ({ input: { onChange, ...restInput }}) => {
  return <FormInput secureTextEntry={true} style={styles.password} onChangeText={onChange} {...restInput} />
}

class LoginForm extends Component {
  render () {
    const {     
      doLogin,
      gotoRegistration,
      previousPage, 
    } = this.props


    return (
    <View style={{flex:1}}>
    <Form onSubmit={doLogin}> 
      <FormLabel>Correo</FormLabel>
      <Field name='username' component={renderInput} />
      <FormLabel>Contraseña</FormLabel>
      <Field name='password' component={renderPasswordInput} />

      <Button onPress={gotoRegistration} textStyle={{color:Colors.secondaryDark}} buttonStyle={{margin:5, backgroundColor:Colors.transparent}}title='¿No tienes cuenta?: Crear Nueva Cuenta'/>
    <View style={{flex:5,marginTop:60,flexDirection: 'column',
        justifyContent: 'space-around'}}>
        <View style={{flex:1}}>
        

        {/* <SocialIcon
          title='Iniciar Sesión con Facebook'
          button
          type='facebook'
        />

        <SocialIcon
          title='Iniciar Sesión con Twitter'
          button
          type='twitter'
        /> */}
        
        </View>

        </View>
        <ActionsContainer>
            <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</FButton>
        </ActionsContainer> 
        <ActionsContainer>
            <FButton onPress={doLogin} theme={Theme} type="submit" className="next">Iniciar Sesión</FButton>
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
})(LoginForm)