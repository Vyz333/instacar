import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  AuthenticationRequest: ['data'],
  AuthenticationSuccess: ['payload'],
  AuthenticationFailure: null,
  createUserRequest: ['data'],
  createUserSuccess: ['payload'],
  createUserFailure: ['error_msg'],
  loginUserRequest: ['data'],
  loginUserSuccess: ['payload'],
  loginUserFailure: null,
})

export const AuthenticationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  jwt: null,
  user: null,
  error: null,
  error_msg: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload:{...payload,...state.payload} })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const failureMsg = (state, action) =>{
  const { error_msg } = action
  return state.merge({ fetching: false, error: true, payload: null, error_msg })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTHENTICATION_REQUEST]: request,
  [Types.AUTHENTICATION_SUCCESS]: success,
  [Types.AUTHENTICATION_FAILURE]: failure,
  [Types.CREATE_USER_REQUEST]: request,
  [Types.CREATE_USER_SUCCESS]: success,
  [Types.CREATE_USER_FAILURE]: failureMsg,
  [Types.LOGIN_USER_REQUEST]: request,
  [Types.LOGIN_USER_SUCCESS]: success,
  [Types.LOGIN_USER_FAILURE]: failure,
})
