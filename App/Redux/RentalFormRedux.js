import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rentalFormRequest: ['data'],
  rentalFormSuccess: ['payload'],
  rentalFormFailure: null,
  carsRequest: null,
  carsSuccess: ['cars'],
  carsFailure: null,
  postOrderRequest: ['data'],
  postOrderSuccess: ['payload'],
  postOrderFailure: null,
  createUserRequest: ['data'],
  createUserSuccess: ['payload'],
  createUserFailure: null,
  loginUserRequest: ['data'],
  loginUserSuccess: ['payload'],
  loginUserFailure: null,
})

export const RentalFormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  data: null,
  cars: null,
  fetching: null,
  payload: null,
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

// request the data from an api
export const requestCars = (state, { data }) =>
state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const successCars = (state, action) => {
const {cars} = action
return state.merge({ fetching: false, error: null, cars})
}

// Something went wrong somewhere.
export const failureCars = state =>
state.merge({ fetching: false, error: true, payload: null })



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RENTAL_FORM_REQUEST]: request,
  [Types.RENTAL_FORM_SUCCESS]: success,
  [Types.RENTAL_FORM_FAILURE]: failure,
  [Types.CARS_REQUEST]: requestCars,
  [Types.CARS_SUCCESS]: successCars,
  [Types.CARS_FAILURE]: failureCars,
  [Types.POST_ORDER_REQUEST]: request,
  [Types.POST_ORDER_SUCCESS]: success,
  [Types.POST_ORDER_FAILURE]: failure,
  [Types.CREATE_USER_REQUEST]: request,
  [Types.CREATE_USER_SUCCESS]: success,
  [Types.CREATE_USER_FAILURE]: failure,
  [Types.LOGIN_USER_REQUEST]: request,
  [Types.LOGIN_USER_SUCCESS]: success,
  [Types.LOGIN_USER_FAILURE]: failure,
})
