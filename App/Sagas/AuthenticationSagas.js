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
import AuthenticationActions from '../Redux/AuthenticationRedux'
import APIKeys from '../Config/APIKeys'

export function * getAuthentication (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getAuthentication, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AuthenticationActions.AuthenticationSuccess(response.data))
  } else {
    yield put(AuthenticationActions.AuthenticationFailure())
  }
}

export function * createUser (api, action) {
  const { data } = action
  const existingUserResponse = yield call(api.searchUser,data.username)
  if(existingUserResponse.ok && existingUserResponse.data.length>0){
    console.log(existingUserResponse)
    yield put(AuthenticationActions.createUserFailure('Ya existe un usuario con este e-mail.'))
  }else{
    const loginResponse = yield call(api.loginUser, {username:APIKeys.username,password:APIKeys.password})
    if (loginResponse.ok) {
      
      // make the call to the api
      const response = yield call(api.postUser, {...data,token:loginResponse.data.token})
      console.log(response)
      // success?
      if (response.ok) {
        // You might need to change the response here - do this with a 'transform',
        // located in ../Transforms/. Otherwise, just pass the data back from the api.
        const user = {username:response.data.username,password:data.password}
        yield put(AuthenticationActions.loginUserRequest(user))
        const userResponse = yield call(api.getUserByName,data.username)
        if(userResponse.ok){
          yield put(AuthenticationActions.createUserSuccess({...response.data,...userResponse.data}))
          //yield put(AuthenticationActions.loginUserSuccess({...response.data,...userResponse.data}))
        }else{
          yield put(AuthenticationActions.createUserFailure('Error creando usuario, intente más tarde.'))
        }
      } else {
        yield put(AuthenticationActions.createUserFailure('Error creando usuario.'))
      }
    }else {
      yield put(AuthenticationActions.createUserFailure('Error creando usuario.'))
    }
  }
}

export function * loginUser (api, action) {
  const { data } = action
  
  // make the call to the api
  const response = yield call(api.loginUser, data)
  const userResponse = yield call(api.getUserByEmail,data.user_email)
  console.log(response)
  // success?
  if (response.ok && response.data && response.data.token && userResponse.ok) {
    yield put(AuthenticationActions.loginUserSuccess({...response.data,...userResponse.data}))
  } else {
    yield put(AuthenticationActions.loginUserFailure())
  }
}