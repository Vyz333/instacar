import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
import { Field } from 'redux-form'; 
import validate from './Validation/RentalFormPage1Validation'
import {
  ActionsContainer,
  Form,
} from 'react-native-clean-form'
import Drawer from 'react-native-drawer'
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
      onTintColor={Colors.primary}
    />
  </View>
)
class RentalFormPage1 extends Component {
  _openInventory = () =>{
    console.log('Inventory')
  }
  render () {
    const { nextPage,cars,selection, multiple } = this.props
    return (
      <View style={{flex:1,flexDirection: 'column',justifyContent: 'flex-start'}}>
      <Form>  
        {/* <View style={{alignSelf:'flex-start',flex:1,flexDirection: 'column',justifyContent: 'flex-start',alignItems: 'center',}}> */}
          <Field name='multiple' component={renderSwitch} />
          <Field name='car' component={CarSwiper} props={{cars}}/>
          
          <View style={styles.smallButton}>
          {multiple?
          <Button 
            onPress={this._openInventory}
            title="+Agregar Otro"
            color={Colors.primary}
          />
          :
          <Text></Text>
          }
          </View>
        {/* </View> */}
      </Form>
      <ActionsContainer >
            <NextButton title='DATOS DE RESERVACIÓN' onPress={nextPage} />
      </ActionsContainer>
        {multiple &&
        <TouchableOpacity onPress={this._openInventory} style={styles.drawerHandle}>
        <Icon name='directions-car' color={Colors.white} />
        <Text 
          style={styles.drawerText}
        >
        8
        </Text>
        
        </TouchableOpacity>}

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