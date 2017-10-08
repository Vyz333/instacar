import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { reducer as formReducer } from 'redux-form'
export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    rental: require('./RentalFormRedux').reducer,
    auth: require('./AuthenticationRedux').reducer,
    search: require('./SearchRedux').reducer,
    wp: require('./WpRedux').reducer,
    form: formReducer,
    orders: require('./OrdersRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
