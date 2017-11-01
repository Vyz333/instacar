import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/NextButtonStyle'
import Colors from '../Themes/Colors'
import { Button } from 'react-native-elements'
export default class NextButton extends Component {
  // // Prop type warnings
  static propTypes = {
    iconName: PropTypes.string,
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }
  
  // Defaults for props
  static defaultProps = {
    iconName: 'navigate-next',
    backgroundColor: Colors.darkCoal,
  }

  render () {
    const {iconName,backgroundColor,title,onPress,...otherProps} = this.props
    return (
      <Button 
      raised
      iconRight
      backgroundColor={backgroundColor}
      containerViewStyle={styles.container}
      buttonStyle={styles.button}
      icon={{name: iconName}}
      title={title}
      onPress={onPress} 
      color={Colors.white}
      {...otherProps}
      />
    )
  }
}
