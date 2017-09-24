import React,{Component} from 'react'
import {
  reduxForm
} from 'redux-form/immutable'
import validate from './RentalFormPage2Validation'
import {
  ActionsContainer,
  FieldsContainer,
  Fieldset,
  FormGroup,
  FieldSet,
  Form,
  Label
} from 'react-native-clean-form'
import { Field } from 'redux-form'; 
import {Button as FButton} from 'react-native-clean-form'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import AddressField from '../AddressField'
import DateTimeField from '../DateTimeField'
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import {Theme,getThemeWithButtonBackground} from '../../Themes/FormTheme'
let order = {}
class RentalFormPage2 extends Component {
  render(){
  const {
    nextPage,
    previousPage,
  } = this.props

  return ( 
    
    <Form onSubmit={nextPage}> 
      <View style={{flex:1,marginTop:10,flexDirection: 'column',
        justifyContent: 'space-between'}}>
        <View style={{flex:1}}>
        <Field name='delivery_address' component={AddressField} props={{
                    icon:{name: 'my-location'},
                    buttonStyle:{backgroundColor: Colors.primaryLight},
                    buttonTextStyle:{textAlign: 'center',padding:5},
                    textStyle:{textAlign: 'center',padding:5},
                    title:'Dirección de Entrega',
                    placeholder:'Lugar de Entrega',
        }}/>
        </View>
        <View style={{flex:1}}>
        <Field name='delivery_datetime' component={DateTimeField} props={{
                    icon:{name: 'date-range'},
                    buttonStyle:{backgroundColor: Colors.primaryLight},
                    buttonTextStyle:{textAlign: 'center',padding:5},
                    textStyle:{textAlign: 'center',padding:5},
                    title:'Hora y Fecha de Entrega',
        }}/>
        </View>
        <View style={{flex:1}}>
        <Field name='return_address' component={AddressField} props={{
                    icon:{name: 'my-location'},
                    buttonStyle:{backgroundColor: Colors.primaryLight},
                    buttonTextStyle:{textAlign: 'center',padding:5},
                    textStyle:{textAlign: 'center',padding:5},
                    title:'Dirección de Retorno',
                    placeholder:'Lugar de Retorno',
        }}/>
        </View>

        <View style={{flex:1}}>
        <Field name='return_datetime' component={DateTimeField} props={{
                    icon:{name: 'date-range'},
                    buttonStyle:{backgroundColor: Colors.primaryLight},
                    buttonTextStyle:{textAlign: 'center',padding:5},
                    textStyle:{textAlign: 'center',padding:5},
                    title:'Hora y Fecha de Retorno',
        }}/>
        </View>

        <ActionsContainer>
            <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</FButton>
        </ActionsContainer>        
        <ActionsContainer>
            <FButton onPress={nextPage} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</FButton>
        </ActionsContainer>
        </View>
    </Form>

  )
}
}

export default reduxForm({
  form: 'rental_form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(RentalFormPage2)
