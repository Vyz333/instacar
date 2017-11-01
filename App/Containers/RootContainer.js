import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Orientation from 'react-native-orientation-locker';
import NotificationsActions from '../Redux/NotificationsRedux'
import SplashScreen from 'react-native-splash-screen'
import FCM, {
  FCMEvent, 
  RemoteNotificationResult, 
  WillPresentNotificationResult, 
  NotificationType} from 'react-native-fcm';
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount() {
    // this will lock the view to Portrait 
    Orientation.lockToPortrait();
    
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // Hide splashscreen
    SplashScreen.hide();
    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
    
    FCM.getFCMToken().then(token => {
        console.log(token)
        this.props.setToken(token)
        // store fcm token in your server
    });
    
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        console.log('Components stuff')
        this.props.receiveNotification(notif)
        // optional, do some component related stuff
    });
    
    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    FCM.getInitialNotification().then(notif=>console.log(notif));
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
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
  setToken: (token) => dispatch(NotificationsActions.setTokenRequest(token)),
  receiveNotification: (notif) => dispatch(NotificationsActions.notificationReceptionRequest(notif))
})

export default connect(null, mapDispatchToProps)(RootContainer)
