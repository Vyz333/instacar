import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
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
import {ButtonGroup, Card,Button} from 'react-native-elements'
import {Button as FButton} from 'react-native-clean-form'

import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'
class RentalFormPage3 extends Component {
  constructor (props) {
    super(props);


  }
  _cardPayment(){

  }
  _oxxoPayment(){
    
  }
  render () {
    const {     
      handleSubmit,
      previousPage, 
    } = this.props


    return (
    <View style={{flex:1}}>
    <Form onSubmit={handleSubmit}>  
    <View style={{flex:5,marginTop:60,flexDirection: 'column',
        justifyContent: 'space-around'}}>
        <View style={{flex:1}}>
        <Button
          raised
          icon={{name: 'credit-card'}}
          buttonStyle={{backgroundColor: Colors.primaryLight}}
          textStyle={{textAlign: 'center'}}
          title={'Tarjeta de Crédito o Débito'}
          onPress={this._showAddressPicker1}
        />
        </View>

        <View style={{flex:1}}>
        <Button
          raised
          icon={{name: 'store'}}
          buttonStyle={{backgroundColor: Colors.primaryLight}}
          textStyle={{textAlign: 'center'}}
          title={`OXXO Pay`}
          onPress={this._showDateTimePicker1}
        />
        
        </View>

        </View>
        <ActionsContainer>
            <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</FButton>
        </ActionsContainer>        
        <ActionsContainer>
            <FButton onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</FButton>
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
})(RentalFormPage3)