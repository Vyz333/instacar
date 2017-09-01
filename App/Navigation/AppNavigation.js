import { StackNavigator } from 'react-navigation'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import RentalForm from '../Components/RentalForm'
import styles from './Styles/NavigationStyles'

import React from 'react'
import Colors from '../Themes/Colors'
import {Header} from 'react-native-elements'
const head = <Header
backgroundColor ={Colors.primary}
statusBarProps={{ barStyle: 'light-content' }}
leftComponent={{ icon: 'menu', color: '#fff' }}
centerComponent={{ text: 'INSTACAR', style: { color: '#fff' } }} 
outerContainerStyles={styles.header}
/>;

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MainScreen: { screen: MainScreen },
  LaunchScreen: { screen: LaunchScreen },
  RentalForm: {screen: RentalForm},
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    headerStyle: styles.header,
    title: "INSTACAR",
    header:head,
  }
})

export default PrimaryNav
