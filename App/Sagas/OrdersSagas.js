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
import { 
  call, cancel, 
  fork, take, 
  put, cancelled, } from 'redux-saga/effects'
import OrdersActions from '../Redux/OrdersRedux'

export function * getOrders (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getOrders, data)
  
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(OrdersActions.ordersSuccess(response.data))
  } else {
    yield put(OrdersActions.ordersFailure())
  }
}

export function * acceptOrder (api, action) {
  const { data } = action
  // make the call to the api
  while (true) {
    const response = yield call(api.updateOrder, data.id,{current_status:'1'},data.token)
    if(response && response.ok){
      yield put(OrdersActions.acceptOrderSuccess(response.data))
      break
    }else{
      yield put(OrdersActions.acceptOrderFailure())
    }
    yield call(delay, 1000);
  }
}

export function * declineOrder (api, action) {
  const { data } = action
  // make the call to the api
  while (true) {
    const response = yield call(api.updateOrder, data.id,{current_status:'3'},data.token)
    if(response && response.ok){
      yield put(OrdersActions.acceptOrderSuccess(response.data))
      break
    }else{
      yield put(OrdersActions.acceptOrderFailure())
    }
    yield call(delay, 1000);
  }
}

export function * watchOrdersAccept(api, action){
  const {data} = action
  const delayTime = 1000
  console.log(data)
  let ids = data.slice()
  while (true) {
    let pendingOrders = []
    let ordersReady = true
    for(let id of ids){
      const response = yield call(api.getOrderById,id)
      if(!response.ok || response.data.current_status=='0'){
        pendingOrders.push(id)
      }
    }
    if(pendingOrders == []||pendingOrders.length<1){
      yield put(OrdersActions.watchOrdersSuccess())
      return
    }
    ids = pendingOrders.slice()
    yield call(delay, delayTime);
  }
}