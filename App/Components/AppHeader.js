import React from 'react'
import Colors from '../Themes/Colors'
import styles from  '../Navigation/Styles/NavigationStyles'
import {Header} from 'react-native-elements'
export default AppHeader = props => {
  const { buttonCallback, icon, title } = props
  return (
    <Header
    backgroundColor ={Colors.transparent}
    statusBarProps={{ barStyle: 'light-content' }}
    leftComponent={{ icon: icon, color: Colors.primary, onPress:buttonCallback }}
    centerComponent={{ numberOfLines:1,text: title, style: { color: Colors.primary,fontWeight:'bold' } }} 
    outerContainerStyles={styles.header}
    />
  )
}