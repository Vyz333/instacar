import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rentalFormRequest: ['data'],
  rentalFormSuccess: ['payload'],
  rentalFormFailure: null,
  carsRequest: null,
  carsSuccess: ['payload'],
  carsFailure: null,
  postOrderRequest: ['data'],
  postOrderSuccess: ['payload'],
  postOrderFailure: null,
  updateCarInventory: ['inventory'],
  addCarToInventory: ['data'],
  removeCarFromInventory: ['data'],
  emptyInventory: null,
})

export const RentalFormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  data: null,
  cars: {},
  active_orders: [],
  inventory: [],
  fetching: null,
  payload: null,
  error: null,
})

/* ------------- Async Reducers ------------- */

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

// successful api lookup
export const successCars = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, cars:payload })
}

// successful api lookup
export const successOrder = (state, action) => {
  const { payload } = action
  return state.merge({
    fetching: false, 
    error: null, 
    active_orders: [...state.active_orders,...payload]
  })
}

// Something went wrong somewhere.
export const failureCars = state =>
state.merge({ fetching: false, error: true, payload: null })

/* ------------- Sync Reducers ------------- */

export const addCarToInventory = (state, { data }) => {
  return state.merge({ inventory: [...state.inventory,data]})
}
export const removeCarFromInventory = (state, { data }) => {
  return state.merge({
    inventory: data?[
      ...state.inventory.slice(0,data),
      ...state.inventory.slice(data+1)
    ]
    :
    [
      ...state.inventory.slice(0,state.inventory.length-1)
    ]
  })
}

export const emptyInventory = state => {
  const emptyArray = []
  return state.merge({
    inventory: emptyArray
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RENTAL_FORM_REQUEST]: request,
  [Types.RENTAL_FORM_SUCCESS]: success,
  [Types.RENTAL_FORM_FAILURE]: failure,
  [Types.CARS_REQUEST]: request,
  [Types.CARS_SUCCESS]: successCars,
  [Types.CARS_FAILURE]: failureCars,
  [Types.POST_ORDER_REQUEST]: request,
  [Types.POST_ORDER_SUCCESS]: successOrder,
  [Types.POST_ORDER_FAILURE]: failure,
  [Types.ADD_CAR_TO_INVENTORY]: addCarToInventory,
  [Types.REMOVE_CAR_FROM_INVENTORY]: removeCarFromInventory,
  [Types.EMPTY_INVENTORY]: emptyInventory,
})