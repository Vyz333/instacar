import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import MapMixin from '../Mixins/MapMixin'
import * as firebase from 'firebase'
import styles from './Styles/AddressFieldStyle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Button,Icon } from 'react-native-elements'
import MapView from 'react-native-maps'
import AddressPicker from './AddressPicker'
//import RNGooglePlacePicker from 'react-native-google-place-picker'
import { FormValidationMessage } from 'react-native-elements'
export default class AddressField extends MapMixin {
  constructor (props) {
    super(props);

    this.state = {
      address: '',
    }
  }

  _handleAddressPicked = (addr)=>{
    console.log(addr)
    this.setState({modalVisible:false})
    this.props.input.onChange(addr)
  }
  
  _onSubmit(e) {
    this.writePickupPosition()

    this.props.navigator.push({
      id: 'SetDestination',
      title: 'Set destination',
      passProps: {
        passengerPosition: this.state.passengerPosition,
        pickupPosition: this.state.pickupPosition || this.state.passengerPosition,
      },
    })
  }

  _onDragEnd(e) {
    this.setState({pickupPosition: e.nativeEvent.coordinate})
    this.updateAddress()
  }

  renderSearchBar() {
    const searchBarStyle = StyleSheet.flatten([styles.searchBar, {
      top: this.layout.height - 120,
      width: this.layout.width - 30,
    }])

    return (
      <View style={searchBarStyle}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.address}
        />
        <TouchableHighlight onPress={this.onSubmit}>
          <Text style={styles.setPickupButton}>Set pickup location</Text>
        </TouchableHighlight>
      </View>
    )
  }
  render () {
    const {
      input: {value,onChange },
      meta: {error},
      icon,
      buttonStyle,
      buttonTextStyle,
      textStyle,
      placeholder,
      title} = this.props
    const  {modalVisible} = this.state
    console.log(value)
    return (
      <View style={{flex:1}}>
        <Button
          raised
          icon={icon}
          buttonStyle={buttonStyle}
          textStyle={buttonTextStyle}
          title={title}
          onPress={this._showAddressPicker}
        />
        <Text style={textStyle}>{value?value.address:''}</Text>
        {error && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    )
  }
}
