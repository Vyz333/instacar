import React, { Component } from 'react'
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
import styles from './Styles/UserDataFormStyle'
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
const renderPhoneField = (field) => (
  <KeyboardAvoidingView>
  <FormLabel>Teléfono Celular</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    selectionColor={Colors.primary}
    maxLength={255}
    returnKeyType='next'
    keyboardType='phone-pad'
    
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



class UserDataForm extends Component {
  render () {
    const {     
      register,
      onLogin,
      onRegister,
    } = this.props
    return (
      <View style={{flex:1,flexDirection: 'column',justifyContent: 'space-between'}}>
        <Form> 
              {register && <Field name='name' component={renderNameField}/>}
              <Field name='email' component={renderEmailField}/>
              {register &&  <Field name='phone' component={renderPhoneField}/>}
              <Field name='password' component={renderPasswordField}/>
              <Field name='register' component={renderRegistrationSwitch}/>
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
    if (!values.phone) {
      errors.name = 'Requerido'
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
UserDataForm = createReduxForm( UserDataForm )


const mapStateToProps = (state) => {
  return {
    initialValues: {
      name:state.form.rental_form?state.form.rental_form.values.name:null,
      email:state.form.rental_form?state.form.rental_form.values.email:null
    },
  }
}

export default connect(mapStateToProps, {})(UserDataForm)