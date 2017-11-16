import React, { Component } from 'react'
import {
  View, 
  Text,
  Dimensions, 
  Alert,
  ScrollView, 
  KeyboardAvoidingView,
  Button as RNButton } from 'react-native'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer'
import Snackbar from 'react-native-snackbar'
import _ from 'lodash'
import Colors from '../Themes/Colors'

import RentalFormPage1 from '../Components/RentalFormPages/RentalFormPage1'
import Inventory from '../Components/Inventory'
// Actions
import RentalFormActions from '../Redux/RentalFormRedux'

// Styles
import styles from './Styles/SelectCarScreenStyle'

class SelectCarScreen extends Component {
  static navigationOptions = {
    headerLeft: null,
  }

  _closeInventory = () => {
    this._drawer.close()
  }

  _openInventory = () => {
    this._drawer.open()
  }

  _addToInventory = () =>{
    const {inventory,addCarToInventory,removeCarFromInventory,currentCar,cars} = this.props
    addCarToInventory(currentCar)
    Snackbar.show({
      title: `AGREGASTE: ${cars[currentCar.cat][currentCar.idx].title}`,
      duration: Snackbar.LENGTH_LONG,
      action: {
          title: 'DESHACER',
          color: Colors.green,
          onPress: () => { 
            setTimeout(()=>{
              removeCarFromInventory()
            }, 200)
          },
      },
    });
  }

  _removeFromInventory = (index) =>{
    const {inventory,removeCarFromInventory} = this.props
    removeCarFromInventory(index)
  }

  _next = () => {
    const { multiple, inventory } = this.props
    const {navigate} = this.props.navigation;
    if(multiple && inventory && inventory.length < 1){
      Alert.alert(
        'No hay carros en tu inventario',
        'Debes selecciona al menos 1 carro, o cambiar al modo de carro sencillo.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      //alert(,'Debes selecciona al menos 1 carro, o cambiar al modo de carro sencillo.')
    }else{
      navigate('ItineraryScreen')
    }
    
  }

  render () {
    const { cars, multiple, inventory } = this.props
    return (
      <Drawer
      ref={(ref) => this._drawer = ref}
      content={
        <Inventory 
        cars={cars} 
        inventory={inventory}
        onRemoveItem={this._removeFromInventory}
        closeInventory={this._closeInventory}
        />
      }
      >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {cars && 
          <RentalFormPage1 cars={cars} 
          multiple={multiple}
          nextPage={this._next}
          inventory={inventory}
          openInventory={this._openInventory}
          addToInventory={this._addToInventory}
          />
          }
        </View>
      </View>
      </Drawer>
    )
  }
}
defaultValues={
  driver:{key:0,label:'No',value:false},
  trip_type:{key:0,label:'Solo en ciudad',value:0},
  inventory:[],
  multiple: false,
  currentCar:{cat:'Autos',idx:0},
}

const mapStateToProps = (state) => {
  return {
    cars: state.rental.cars,
    multiple: state.form.rental_form?
    state.form.rental_form.values.multiple:false,
    currentCar: state.form.rental_form
      ?state.form.rental_form.values.currentCar:{cat:'Autos',idx:0},
    inventory: state.rental.inventory?state.rental.inventory:[],
    initialValues: defaultValues,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCarToInventory: (currentCar) => dispatch(RentalFormActions.addCarToInventory(currentCar)),
    removeCarFromInventory: (index) => dispatch(RentalFormActions.removeCarFromInventory(index)),
    emptyInventory: () => dispatch(RentalFormActions.emptyInventory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCarScreen)