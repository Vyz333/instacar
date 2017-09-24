import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
import { Field } from 'redux-form'; 
import validate from './RentalFormPage1Validation'
import {
  ActionsContainer,
  Button,
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
import { View,Text,Dimensions } from 'react-native'
import CarSwiper from '../CarSwiper'
import SliderEntry from '../SliderEntry';
import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'

class RentalFormPage1 extends Component {

  render () {
    const { nextPage,cars } = this.props
    return (
      <View style={{flex:1}}>
      <Form onSubmit={nextPage}>  
      <Field name='car' component={CarSwiper} props={{cars}}/>
          <ActionsContainer>
              <Button onPress={nextPage} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</Button>
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
})(RentalFormPage1)