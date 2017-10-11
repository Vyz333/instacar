import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Orientation from 'react-native-orientation-locker';

import SplashScreen from 'react-native-splash-screen'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // this will lock the view to Portrait 
    Orientation.lockToPortrait();
    
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // Hide splashscreen
    SplashScreen.hide();
  }
 //<StatusBar barStyle='light-content' />
  render () {
    return (
      <View style={styles.applicationView}>
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(null, mapDispatchToProps)(RootContainer)
