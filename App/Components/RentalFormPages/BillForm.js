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
class BillForm extends Component {
  constructor (props) {
    super(props);


  }
  _onRFCChange(){

  }
  _onTermChange(){

  }
  _onAddressChange(){
    
  }
  render () {
    const {     
      nextPage,
      previousPage, 
    } = this.props

    
    return (
    <View style={{flex:1}}>
    <Form onSubmit={nextPage}>  
      <Text style={{paddingTop:5,textAlign:'center'}}>Datos de Facturación</Text>
      <FormLabel>Razón Social</FormLabel>
      <FormInput onChangeText={this._onTermChange}/>
      <FormLabel>Dirección</FormLabel>
      <FormInput onChangeText={this._onAddressChange}/>
      <FormLabel>RFC</FormLabel>
      <FormInput onChangeText={this._onRFCChange}/>

    <View style={{flex:5,marginTop:60,flexDirection: 'column',
        justifyContent: 'space-around'}}>

        </View>
        <ActionsContainer>
        <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</FButton>
    </ActionsContainer>        
    <ActionsContainer>
        <FButton onPress={nextPage} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</FButton>
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
})(BillForm)