import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/AddressFieldStyle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button,Icon } from 'react-native-elements';
import AddressPicker from './RentalFormPages/AddressPicker'

export default class AddressField extends Component {
  constructor (props) {
    super(props);
    this._handleAddressPicked = this._handleAddressPicked.bind(this)

    this.state = {
      //Date selector
      modalVisible: false,
      address: '',
    }
  }
  _showAddressPicker = () => this.setState({ modalVisible: true});

  _handleAddressPicked(addr){
    this.setState({modalVisible:false})
    this.props.input.onChange(addr)
  }

  render () {
    const {
      input: {value,onChange }, 
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
        <Text style={textStyle}>{value?value.description:''}</Text>
        <AddressPicker pickAddressHandler={this._handleAddressPicked}
        modalVisible={modalVisible} 
        address={value}
        placeholder={placeholder}/>
      </View>
    )
  }
}
