import { takeLatest,takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { RentalFormTypes } from '../Redux/RentalFormRedux'
import { AuthenticationTypes } from '../Redux/AuthenticationRedux'
import { OrdersTypes } from '../Redux/OrdersRedux'
import { NotificationsTypes } from '../Redux/NotificationsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {getCars,postOrder} from './RentalFormSagas'
import {createUser,loginUser} from './AuthenticationSagas'
import {getOrders,watchOrdersAccept,acceptOrder,declineOrder} from './OrdersSagas'
import {receiveNotification,sendNotificationUpstream,setToken} from './NotificationsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [

    // some sagas receive extra parameters in addition to an action
    //takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    
    takeLatest(RentalFormTypes.CARS_REQUEST,getCars,api),
    
    takeLatest(RentalFormTypes.POST_ORDER_REQUEST,postOrder,api),

    takeLatest(AuthenticationTypes.CREATE_USER_REQUEST,createUser,api),

    takeEvery(AuthenticationTypes.LOGIN_USER_REQUEST,loginUser,api),

    takeLatest(OrdersTypes.ORDERS_REQUEST,getOrders,api),
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(OrdersTypes.ACCEPT_ORDER_REQUEST, acceptOrder,api),

    takeLatest(OrdersTypes.DECLINE_ORDER_REQUEST, declineOrder,api),

    takeLatest(OrdersTypes.WATCH_ORDERS_REQUEST, watchOrdersAccept,api),

    takeLatest(NotificationsTypes.NOTIFICATION_RECEPTION_REQUEST, receiveNotification,api),

    takeLatest(NotificationsTypes.NOTIFICATIONS_REQUEST, sendNotificationUpstream,api),
    
    takeLatest(NotificationsTypes.SET_TOKEN_REQUEST, setToken),
    
  ]
}
