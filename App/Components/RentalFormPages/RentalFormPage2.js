import React,{Component} from 'react'
import {
  reduxForm
} from 'redux-form/immutable'
import validate from './Validation/RentalFormPage2Validation'
import {
  ActionsContainer,
  Form,
  Label
} from 'react-native-clean-form'
import { Field } from 'redux-form'; 
import {Button as FButton} from 'react-native-clean-form'
import { Button } from 'react-native-elements'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import AddressField from '../AddressField'
import DateTimeField from '../DateTimeField'
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import NextButton from '../NextButton'

class RentalFormPage2 extends Component {
  render(){
    const {
      nextPage,
    } = this.props
    return (
    <View style={{flex:1}}>
    <Form>
    <View style={{flex:1,backgroundColor:'blue'}}>
    <Field name='delivery_address' component={AddressField} props={{
      icon:{name: 'my-location'},
      buttonStyle:{backgroundColor: Colors.primaryLight},
      buttonTextStyle:{textAlign: 'center',padding:5},
      textStyle:{textAlign: 'center',padding:5},
      title:'Dirección de Entrega',
      placeholder:'Lugar de Entrega',
    }}/>
    </View>
    </Form>
    <View style={styles.actionContainer}>
    <NextButton title='DATOS DE RESERVACIÓN' onPress={nextPage} />
    </View>
    </View>
    )
  }

  render2(){
  const {
    nextPage,
  } = this.props

  return ( 
    <View style={{flex:1,flexDirection: 'column',justifyContent: 'space-between'}}>
        <View style={{flex:1,flexDirection: 'column',justifyContent: 'space-between'}}>
        <Form>
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
        </Form>
        </View> 
        <ActionsContainer>
          <NextButton title='DATOS DE RECORRIDO' onPress={nextPage} />
        </ActionsContainer> 
        </View>
  )
}
}

export default reduxForm({
  form: 'rental_form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(RentalFormPage2)
