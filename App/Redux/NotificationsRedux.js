import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationsRequest: ['data'],
  notificationsSuccess: ['payload'],
  notificationsFailure: null,
  notificationReceptionRequest: ['data'],
  notificationReceived: ['payload'],
  setToken: ['payload'],
  setTokenRequest: ['data'],
  //notificationsUpstream: null,
})

export const NotificationsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  notification: null,
  token: null,
  error: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const received = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, notification:payload })
}

export const setToken = (state, action) =>{
  const {payload} = action
  return state.merge({ token:payload })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATIONS_REQUEST]: request,
  [Types.NOTIFICATIONS_SUCCESS]: success,
  [Types.NOTIFICATIONS_FAILURE]: failure,
  [Types.NOTIFICATION_RECEPTION_REQUEST]: request,
  [Types.NOTIFICATION_RECEIVED]: received,
  [Types.SET_TOKEN_REQUEST]: request,
  [Types.SET_TOKEN]: setToken,
})
