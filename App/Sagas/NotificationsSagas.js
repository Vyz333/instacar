/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/
import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import NotificationsActions from '../Redux/NotificationsRedux'

export function * sendNotificationUpstream (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.upstreamNotification, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(NotificationsActions.notificationsSuccess(response.data))
  } else {
    yield put(NotificationsActions.notificationsFailure())
  }
}

export function * receiveNotification (api,action) {
  const { data } = action
  yield put(NotificationsActions.notificationReceived(data))
}

export function * setToken(action){
  const { data } = action
  yield call(delay, 500)
  yield put(NotificationsActions.setToken(data))
}