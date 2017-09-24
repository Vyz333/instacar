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

import { call, put } from 'redux-saga/effects'
import RentalFormActions from '../Redux/RentalFormRedux'

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
  console.log("inside cars saga")
  if (__DEV__ && console.tron) {
    // logging an object for better clarity
    console.tron.log({
      message: 'RentalFormSagas',
    })
  }
  const { data } = action
  // make the call to the api
  const response = yield call(api.getCars, data)
  
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RentalFormActions.carsSuccess(response.data))
  } else {
    yield put(RentalFormActions.carsFailure())
  }
}
export function * postOrder (api, action) {
  console.log("inside post order saga")

  const { data } = action
  // make the call to the api
  const response = yield call(api.postOrder, data)
  
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RentalFormActions.postOrderSuccess(response.data))
  } else {
    yield put(RentalFormActions.postOrderFailure())
  }
}

export function * createUser (api, action) {
  console.log("inside create user saga")

  const { data } = action
  // make the call to the api
  const response = yield call(api.createUser, data)
  
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RentalFormActions.createUserSuccess(response.data))
  } else {
    yield put(RentalFormActions.createUserFailure())
  }
}

export function * loginUser (api, action) {
  console.log("inside create user saga")

  const { data } = action
  // make the call to the api
  const response = yield call(api.loginUser, data)
  
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RentalFormActions.loginUserSuccess(response.data))
  } else {
    yield put(RentalFormActions.loginUserFailure())
  }
}