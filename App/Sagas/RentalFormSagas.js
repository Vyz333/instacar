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

import { call, put} from 'redux-saga/effects'
import RentalFormActions from '../Redux/RentalFormRedux'
import OrdersActions from '../Redux/OrdersRedux'
import FormatCars from '../Transforms/FormatCars'
import APIKeys from '../Config/APIKeys'

export function * getRentalForm (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getrentalForm, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RentalFormActions.rentalFormSuccess(response.data))
  } else {
    yield put(RentalFormActions.rentalFormFailure())
  }
}
export function * getCars (api, action) {
  const { data } = action
  // make the call to the api
  
  const response = yield call(api.getCars)
  
  //console.log(response)
    // success?
  if (response && response.ok && response.data) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const formattedCars = FormatCars(response.data)
    if(formattedCars)
    yield put(RentalFormActions.carsSuccess(formattedCars))
  } else {
    yield put(RentalFormActions.carsFailure())
  }
}
export function * postOrder (api, action) {
  console.log("inside post order saga")
  return
  const { data } = action
  // make the call to the api
  const loginResponse = yield call(api.loginUser, {username:APIKeys.username,password:APIKeys.password})
  if (loginResponse.ok && loginResponse.data.token) {
      //yield put(ping(pingUrl));
      let orders = data.slice()
      while (true) {
        let pendingOrders = []
        let postedOrders = []
        for(let order of orders){
          const response = yield call(api.postOrder, {...order,token:loginResponse.data.token})
          if(response && response.ok){
            const id = response.data.id
            postedOrders.push(id)
          }else{
            pendingOrders.push(order)
          }
        }  
        if(pendingOrders == []||pendingOrders.length<1){
          yield put(RentalFormActions.postOrderSuccess(postedOrders))
          yield put(OrdersActions.watchOrdersRequest(postedOrders))
          break
        }else{
          yield put(RentalFormActions.postOrderFailure())
        }
        orders = pendingOrders.slice()
        yield call(delay, 100);
      }
  }else{
    yield put(RentalFormActions.postOrderFailure())
  }
}