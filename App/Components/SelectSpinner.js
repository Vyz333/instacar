import React, { PureComponent } from 'react'
import { Text,View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import styles from './Styles/SelectSpinnerStyle'
const { height, width } = Dimensions.get('window');

export default class SelectSpinner extends PureComponent {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.focused != this.props.focused;
  }


  render () {
    const size= this.props.size
    const containerSize=size+2
    const inactiveOpacity = this.props.focused ? 1:0.16

    const spinnerView = 
          <View style={[styles.circleWrapper, {
            width: containerSize,
            height: containerSize,
            opacity: inactiveOpacity,
          }]}>
            <View
              style={[styles.outerCircle, {
                width: size,
                height: size,
                borderRadius: size/2,
              }]}
            />
            <View
              style={[styles.innerCircle, {
                borderRadius: size/4,
                width: size/2,
                height: size/2,
                left: size/4,
                top: size/4,
                borderWidth: 3 * StyleSheet.hairlineWidth,
                opacity: inactiveOpacity*0.9,
              }]}
            />
          </View>

		return (
      <View>
			{spinnerView}
      </View>
		);
  }
}
/*const styles = StyleSheet.create({

});*/