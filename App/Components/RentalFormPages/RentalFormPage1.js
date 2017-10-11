import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import { Field } from 'redux-form'; 
import validate from './Validation/RentalFormPage1Validation'
import {
  ActionsContainer,
  Form,
} from 'react-native-clean-form'
import {Badge,FormLabel,Icon} from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View,Text,Dimensions,Button,TouchableOpacity,Switch } from 'react-native'

import CarSwiper from '../CarSwiper'
import Colors from '../../Themes/Colors'
import NextButton from '../NextButton'
import styles from '../Styles/RentalFormStyle'
const   renderSwitch = (field) => (
  <View style={styles.switch}>
    <Text style={{color:Colors.primaryDark}} >Múltiples carros </Text>
    <Switch 
      value={field.input.value?field.input.value:false}
      onValueChange={(value)=>field.input.onChange(value)}
      thumbTintColor={Colors.primary}
      onTintColor={Colors.primaryLight}
    />
  </View>
)
class RentalFormPage1 extends Component {
  render () {
    const { nextPage,cars,inventory, multiple,openInventory,addToInventory } = this.props
    return (
      <View style={{flex:1,flexDirection: 'column',justifyContent: 'flex-start'}}>
      <Form>
          <Field name='multiple' component={renderSwitch} />
          <Field name='currentCar' component={CarSwiper} props={{cars}}/>
          
          <View style={styles.smallButton}>
          {multiple?
          <Button 
            onPress={addToInventory}
            title="+Agregar Carro"
            color={Colors.primary}
          />
          :
          <Text></Text>
          }
          </View>
      </Form>
      <ActionsContainer >
            <NextButton title='DATOS DE RESERVACIÓN' onPress={nextPage} />
      </ActionsContainer>
        {multiple &&
        <TouchableOpacity onPress={openInventory} style={styles.drawerHandle}>
        <Icon name='directions-car' color={Colors.white} />
        <Text 
          style={styles.drawerText}
        >
        {inventory?inventory.length:0}
        </Text>
        
        </TouchableOpacity>}

      </View>
    )
  }
}

RentalFormPage1 = reduxForm({
  form: 'rental_form',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(RentalFormPage1)

defaultValues={
  currentCar:{cat:'Autos',idx:0},
  multiple: false,
}
const mapStateToProps = (state) => {
  return {
    initialValues: defaultValues,
  }
}

export default connect(mapStateToProps, {})(RentalFormPage1)