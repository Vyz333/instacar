import { StackNavigator } from 'react-navigation'
import DocumentsUploadScreen from '../Containers/DocumentsUploadScreen'
import CompleteUserScreen from '../Containers/CompleteUserScreen'
import AuthScreen from '../Containers/AuthScreen'
import OrdersListScreen from '../Containers/OrdersListScreen'
import LobbyScreen from '../Containers/LobbyScreen'
import TripDataScreen from '../Containers/TripDataScreen'
import ItineraryScreen from '../Containers/ItineraryScreen'
import SelectCarScreen from '../Containers/SelectCarScreen'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import RentalForm from '../Components/RentalForm'
import styles from './Styles/NavigationStyles'

import React from 'react'
import Colors from '../Themes/Colors'
import Header from '../Components/AppHeader'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  DocumentsUploadScreen: { screen: DocumentsUploadScreen },
  CompleteUserScreen: { screen: CompleteUserScreen },
  AuthScreen: { screen: AuthScreen },
  OrdersListScreen: { screen: OrdersListScreen },
  LobbyScreen: { screen: LobbyScreen },
  TripDataScreen: { screen: TripDataScreen },
  ItineraryScreen: { screen: ItineraryScreen },
  SelectCarScreen: { screen: SelectCarScreen },
  MainScreen: { screen: MainScreen },
  LaunchScreen: { screen: LaunchScreen },
  RentalForm: {screen: RentalForm},
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'LaunchScreen',//'AuthScreen',
  navigationOptions: {
    title: "INSTACAR",
    headerTitleStyle: styles.headerTitle,
    headerBackTitle:'Atrás',
    headerTintColor: Colors.primary,
  }
})

export default PrimaryNav
