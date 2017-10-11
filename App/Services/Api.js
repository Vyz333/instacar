// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'
import APIKeys from '../Config/APIKeys'

// our "constructor"
const create = (baseURL = AppConfig.RESTUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // 10 second timeout...
    timeout: 10000,
  })

  const auth_api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL:AppConfig.JWTUrl,
    // 10 second timeout...
    timeout: 10000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getCars = () => api.get('vehicles')
  const getOrders = () => api.get('orders2')
  const getOrderById = (id) => api.get(`orders2/${id}`)

  //const getUser = (username) => api.get('search/users', {q: username})

  const postOrder = (order) => {
    const {token} = order
    return api.post('orders2',order,{headers: {'Authorization': 'Bearer ' + token}})
  }

  const updateOrder = (id,changes,token) => {
    return api.put(`orders2/${id}`,changes,{headers: {'Authorization': 'Bearer ' + token}})
  }


  const searchUser = (username) => {
    return api.get('users',{search:username})
  }
  const postUser = (user) => {
    console.log(user)
    const {token} = user
    return api.post('users',user,{headers: {'Authorization': 'Bearer ' + token}})
  }
  const loginUser = (user) => {
    return auth_api.post('token',user)
  }
  const uploadImage= (image)=> {
    //http://instacar.bismarck.space/wp-content/uploads/2017/09/TABLET-X81C_URVAN-W_Brilliantsilver-2014.jpg.ximg_.m_12_h.smart_.jpg
    AppConfig.UPLOADSUrl
  }
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    searchUser,
    getCars,
    getOrders,
    getOrderById,
    postOrder,
    updateOrder,
    postUser,
    loginUser,
  }
}

// let's return back our create method as the default.
export default {
  create
}
