import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import Moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button,Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { FormValidationMessage } from 'react-native-elements'
import styles from './Styles/DateTimeFieldStyle'

export default class DateTimeField extends Component {
  constructor (props) {
    super(props);
    this._handleDatePicked = this._handleDatePicked.bind(this)
    this.state = {
      //Time selector
      isDateTimePickerVisible: false,
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({isDateTimePickerVisible: false})
    this.props.input.onChange(date)
  };

  render () {

    const {   
      //Time picker state
      isDateTimePickerVisible,
    } = this.state
    const {
      input: {value,onChange }, 
      meta: {error},
      icon,
      buttonStyle,
      buttonTextStyle,
      textStyle,
      title} = this.props

    return (
      <View style={{flex:1}}>
        <Button
          raised
          icon={icon}
          buttonStyle={buttonStyle}
          textStyle={buttonTextStyle}
          title={title}
          onPress={this._showDateTimePicker}
        />
        <Text style={textStyle}>{value?Moment(value).format('DD MMM hh:mm'):''}</Text>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='datetime'
        />
        {error && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    )
  }
}
