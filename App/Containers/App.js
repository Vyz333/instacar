import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import FCMSetup from '../Services/FCMSetup'
import {
  FCMEvent, 
  RemoteNotificationResult, 
  WillPresentNotificationResult, 
  NotificationType} from 'react-native-fcm';
// create our store
const store = createStore()
const FCM = FCMSetup()
/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentDidMount() {
      // iOS: show permission prompt for the first call. later just check permission in user settings
      // Android: check permission in user settings
      FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
      
      FCM.getFCMToken().then(token => {
          console.log(token)
          // store fcm token in your server
      });
      
      this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
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
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
