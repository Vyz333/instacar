import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { RentalFormTypes } from '../Redux/RentalFormRedux'
import { AuthenticationTypes } from '../Redux/AuthenticationRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {getCars,postOrder} from './RentalFormSagas'
import {createUser,loginUser} from './AuthenticationSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    
    takeLatest(RentalFormTypes.CARS_REQUEST,getCars,api),
    
    takeLatest(RentalFormTypes.POST_ORDER_REQUEST,postOrder,api),

    //takeLatest(AuthenticationTypes.CREATE_USER_REQUEST,createUser,api),

    takeLatest(AuthenticationTypes.LOGIN_USER_REQUEST,loginUser,api),
  ]
}
