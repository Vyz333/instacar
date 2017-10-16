import React,{ Component } from 'react'
import { Field,reduxForm } from 'redux-form'
import {
  ActionsContainer,
  Form,
} from 'react-native-clean-form'
import { connect, bindActionCreators } from 'react-redux'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View,Text,Dimensions,Platform,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput,FormValidationMessage,Button } from 'react-native-elements'

import Colors from '../Themes/Colors'
import styles from './Styles/LoginFormStyle'
import NextButton from './NextButton'
const renderNameField = (field) => (
  <KeyboardAvoidingView>
  <FormLabel>Nombre Completo</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    selectionColor={Colors.primary}
    maxLength={255}
    returnKeyType='next'
    />
    {field.meta.error &&
    <FormValidationMessage>{field.meta.error}
    </FormValidationMessage>}
  </KeyboardAvoidingView>
)
const renderEmailField = (field) => (
  <KeyboardAvoidingView>
  <FormLabel>Correo Electrónico</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    selectionColor={Colors.primary}
    keyboardType='email-address'
    returnKeyType='next'
    maxLength={255}
    />
    {field.meta.error &&
    <FormValidationMessage>{field.meta.error}
    </FormValidationMessage>}
  </KeyboardAvoidingView>
)
const renderPasswordField = (field) => (
  <KeyboardAvoidingView>
  <FormLabel>Contraseña</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    maxLength={50}
    selectionColor={Colors.primary}
    returnKeyType='done'
    secureTextEntry={true}
    />
    {field.meta.error &&
    <FormValidationMessage>{field.meta.error}
    </FormValidationMessage>}
  </KeyboardAvoidingView>
)
const renderPasswordField2 = (field) => (
  <KeyboardAvoidingView>
  <FormLabel>Repetir Contraseña</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    maxLength={50}
    selectionColor={Colors.primary}
    returnKeyType='done'
    secureTextEntry={true}
    />
    {field.meta.error &&
    <FormValidationMessage>{field.meta.error}
    </FormValidationMessage>}
  </KeyboardAvoidingView>
)
const renderRegistrationSwitch = (field) => {
  const value = field.input.value?field.input.value:false
return(
  <View>
    <TouchableOpacity style={styles.transparentButton}
      onPress={(ivalue)=>field.input.onChange(!value)}>
     <Text style={styles.textLink}>
     {value?'Ya tienes una cuenta?: Iniciar Sesión':'¿No tienes cuenta?: Crear Nueva Cuenta'}
     </Text>
    </TouchableOpacity>
  </View>
)
}

class LoginForm extends Component {
  render () {
    const {     
      register,
      onLogin,
      onRegister,
      errors,
    } = this.props
    return (
      <View style={{flex:1,flexDirection: 'column',justifyContent: 'space-between'}}>
        <Form> 
              {register && 
                <Field name='name' component={renderNameField}/>
              }
              <Field name='email' component={renderEmailField}/>
              <Field name='password' component={renderPasswordField}/>
              {register && 
              <Field name='password_repeat' component={renderPasswordField2}/>
              }
              <Field name='register' component={renderRegistrationSwitch}/>
              {errors &&
              <FormValidationMessage>{errors}
              </FormValidationMessage>}
       </Form>
       <ActionsContainer>
            <NextButton 
            title={register?'REGISTRARSE':'INICIAR SESIÓN'} 
            onPress={register? onRegister:onLogin} 
            />
          </ActionsContainer>
      </View>
    )
  }
}
const validate = values => {
  const errors = {}
  if(values.register){
    if (!values.name) {
      errors.name = 'Requerido'
    }
    if (!values.password_repeat) {
      errors.passwordd = 'Requerido'
    }
  
    if (values.password_repeat!=values.password) {
      errors.password = 'Las contraseñas no coinciden'
    }
  }
  if (!values.email) {
    errors.email = 'Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Dirección no valida'
  }
  if (!values.password) {
    errors.password = 'Requerido'
  }
  return errors
}

createReduxForm = reduxForm({
  form: 'auth',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})

// evaluate it for ContactForm component
export default createReduxForm( LoginForm )