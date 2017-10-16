import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import deepEqual from 'deep-equal'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordersRequest: ['data'],
  ordersSuccess: ['payload'],
  ordersFailure: null,
  acceptOrderRequest: ['data'],
  acceptOrderSuccess: ['payload'],
  acceptOrderFailure: null,
  declineOrderRequest: ['data'],
  declineOrderSuccess: ['payload'],
  declineOrderFailure: null,
  watchOrdersRequest: ['data'],
  watchOrdersSuccess: null,
})

export const OrdersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  accepted: null,
  fetching: null,
  orders: null,
  payload: null,
  error: null,
  status: 0,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

export const requestNonDestructive = (state, { data }) =>
  state.merge({ fetching: true, data })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

export const successNonDestructive = (state, action) => {
  const { payload } = action
  
  if(!deepEqual(payload,state.payload))
    return state.merge({ fetching: false, error: null, orders:payload })
  else
    return state.merge({ fetching: false})
}

export const successWatchOrders = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, status:1 })
}

export const successAcceptOrder = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, accepted:payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDERS_REQUEST]: requestNonDestructive,
  [Types.ORDERS_SUCCESS]: successNonDestructive,
  [Types.ORDERS_FAILURE]: failure,
  [Types.ACCEPT_ORDER_REQUEST]: request,
  [Types.ACCEPT_ORDER_SUCCESS]: successAcceptOrder,
  [Types.ACCEPT_ORDER_FAILURE]: failure,
  [Types.DECLINE_ORDER_REQUEST]: request,
  [Types.DECLINE_ORDER_SUCCESS]: success,
  [Types.DECLINE_ORDER_FAILURE]: failure,
  [Types.WATCH_ORDERS_REQUEST]: request,
  [Types.WATCH_ORDERS_SUCCESS]: successWatchOrders,
})
