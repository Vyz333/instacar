import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/TripTypeSelectStyle'
import { CheckBox } from 'react-native-elements'

export default class TripTypeSelect extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        <CheckBox
          center
          name=''
          title='Click Here'
          checked={this.state.checked}
        />
      </View>
    )
  }
}
