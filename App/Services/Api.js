// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.RESTUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  let api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    // headers: {
    //   'Cache-Control': 'no-cache'
    // },
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
  const getOrders = () => api.get('orders')
  const getUser = (username) => api.get('search/users', {q: username})
  const loginUser = (username,password) => {
    api = apisauce.create({
      // base URL is read from the "constructor"
      baseURL,
      Authorization:'Basic ' + btoa( username + ':' + password ),
      timeout: 10000,
    })
  }

  const postOrder = (order) => {
    return api.post('order',order)
  }
  const createUser = (user) => {
    return api.post('users',user)
  }
  // const loginUser = (user) => {
  //   return api.post('order',order)
  // }
  const postUser = () => api.post('users',user)
  const uploadImage= (image)=> {
    //http://instacar.bismarck.space/wp-content/uploads/2017/09/TABLET-X81C_URVAN-W_Brilliantsilver-2014.jpg.ximg_.m_12_h.smart_.jpg
    AppConfig.UPLOADSUrl
  }
  // site.posts().create({
  //   title: 'This post has media, tags & categories!',
  //   content: 'Excellent and compelling demonstration',
  //   categories: [ 7, 42 ],
  //   tags: [ 33, 71, 193 ]
  // }).then(function( post ) {
  //   // Create the media record & upload your image file
  //   var filePath = '/path/to/the/image/to/upload.jpg';
  //   return wp.media().file( filePath ).create({
  //     title: 'Amazing featured image',
  //     post: post.id
  //   }).then(function( media ) {
  
  //     // Set the new media record as the post's featured media
  //     return wp.posts().id( post.id ).update({
  //       featured_media: media.id
  //     });
    
  //   });
  // });
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
    getUser,
    getCars,
    getOrders,
    postOrder,
    postUser,
    loginUser,
    createUser,
  }
}

// let's return back our create method as the default.
export default {
  create
}
