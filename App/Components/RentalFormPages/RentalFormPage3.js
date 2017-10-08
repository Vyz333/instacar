import React,{Component} from 'react'
import { connect } from 'react-redux'
import {
  reduxForm
} from 'redux-form/immutable'
import {
  ActionsContainer,
  Form,
} from 'react-native-clean-form'
import { Field } from 'redux-form'; 
import {
  View,
  Text,
  KeyboardAvoidingView
} from 'react-native'
import { FormLabel, FormInput,Button } from 'react-native-elements'
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import Selectbox from 'react-native-selectbox'
import NextButton from '../NextButton'
const tripOptions = [
  {key:0,label:'Solo en ciudad',value:0},
  {key:1,label:'Fuera del estado',value:1},
  {key:2,label:'En ciudad y zona rural',value:2},
]
const yesNoData = [
  { key: 0, label: 'No',value:false },
  { key: 1, label: 'Sí',value:true }
]
const renderDriverField = (field) => (
  <View>
  <FormLabel>Requiere Chofer</FormLabel>
  <Selectbox
    selectedItem={field.input.value?field.input.value:yesNoData[0]}
    items={yesNoData}
    selectLabelStyle={{textAlign:'center'}}
    onChange={(option)=>field.input.onChange(option)} />
  </View>
)
const renderInsuranceField = (field) => (
  <View>
  <FormLabel>Incluye Seguro</FormLabel>
  <Text style={{textAlign:'center'}} disabled={true}>Sí</Text>
  </View>
)
const renderTripTypeField = (field) => (
  <View>
  <FormLabel>Tipo de Recorrido</FormLabel>
  <Selectbox
    selectedItem={field.input.value?field.input.value:tripOptions[0]}
    items={tripOptions}
    selectLabelStyle={{textAlign:'center'}}
    onChange={(option)=>field.input.onChange(option)} />
  </View>
)
const renderNameField = (field) => (
  <View>
  <FormLabel>Nombre Completo</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    selectionColor={Colors.primary}
    returnKeyType='next'
    />
  </View>
)
const renderEmailField = (field) => (
  <View>
  <FormLabel>Correo Electrónico</FormLabel>
  <FormInput 
    value={field.input.value?field.input.value:''}
    onChangeText={(value)=>field.input.onChange(value)}
    selectionColor={Colors.primary}
    keyboardType='email-address'
    returnKeyType='done'
    />
  </View>
)
class RentalFormPage3 extends Component {
  render(){
  const {
    nextPage,
    cancel,
  } = this.props

  return ( 
    // f. Requiere Chofer (combo: No por default / Si)
    // g. Incluye Seguro (combo: Si por default / no mostrar ahorita otras opciones)
    // h. Tipo de recorrido (check box: sola en ciudad, fuera del estado,  en ciudad y zona rural)
    // i. Datos de contacto:
    // i. Nombre completo
    // ii. Correo-e
    // j. Dar click en botón “CHECAR DISPONBILIDAD”  (hay otro botón “CANCELAR”  y allí termina el proceso).  
    <View style={{flex:1,flexDirection: 'column',justifyContent: 'space-between'}}>
    <Form> 
      
      <Field name='driver' component={renderDriverField}/>
      <Field name='trip_type' component={renderTripTypeField}/>
      <Field name='insurance' component={renderInsuranceField}/>
      <KeyboardAvoidingView>
      <Field name='name' component={renderNameField}/>
      <Field name='email' component={renderEmailField}/>
      </KeyboardAvoidingView>
      <Button
        raised
        small
        containerViewStyle={{marginTop:10}}
        icon={{name: 'cancel'}}
        title='CANCELAR' 
        onPress={cancel}
        backgroundColor={Colors.error}
        />
    </Form>
    <ActionsContainer>
          <NextButton title='CHECAR DISPONIBILIDAD' onPress={nextPage} />
    </ActionsContainer>
    </View>

  )
}
}

export default reduxForm({
  form: 'rental_form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(RentalFormPage3)