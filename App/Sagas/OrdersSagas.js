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

export function * watchOrdersAccept(api, action){
  const {data} = action
  while (true) {
    // Begin polling
    const pollTask = yield fork(orderPoll, api,data,{
      delayTime: 1000,
    });
    // Stop polling when navigator is offline
    yield take(OrdersActions.watchOrdersSuccess());
    yield cancel(pollTask);
  }
}
export function* orderPoll(api,data,{delayTime}){
    //yield put(ping(pingUrl));
    let ids = data.slice()
    while (true) {
      let pendingOrders = []
      let ordersReady = true
      for(let id of ids){
        let response = yield call(api.getOrderById,id)
        if(!response.ok || response.data.current_status!='0'){
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