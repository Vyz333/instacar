//import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */
import { createActions,createReducer } from 'redux-wordpress';

const actions = createActions('instacar-api',AppConfig.WPUrl, ['orders', 'users']);
export default actions;

/* ------------- Reducers ------------- */

export const reducer = createReducer('instacar')
