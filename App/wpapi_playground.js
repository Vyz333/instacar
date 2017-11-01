//import WPAPI from 'wpapi'
const util = require('util')
const WPAPI = require('wpapi')
const apisauce =require('apisauce') 
const effects = require('redux-saga/effects')
const { call, put } = effects 
AppConfig= {
  RESTUrl: 'http://instacar.bismarck.space/wp-json/wp/v2/',
  WPUrl: 'http://instacar.bismarck.space/wp-json/',
  UPLOADSUrl: 'http://instacar.bismarck.space/wp-content/uploads/',
  // font scaling override - RN default is on
  allowTextFontScaling: true
}
// our "constructor"

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const username= 'service'
  const password= 'instacar'
  let api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL:AppConfig.RESTUrl,
    // here are some default headers
    headers: {
    //   'Cache-Control': 'no-cache'
      Authorization:'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
    },
    // 10 second timeout...

    timeout: 10000,
  })
  
const user = {
  username:"user1",
  first_name:"v.firstName",
  last_name:"v.lastName",
  email:"foo@bar.com",
  password:"foo",
}

function printObj(obj){
  console.log(JSON.stringify(obj, null, 4))
}
const authHeaders = {
  headers: {
    Authorization:'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
  }
}
let response = api.post('users',user,authHeaders).then(function(resp){
  console.log(resp)
})

const wp = new WPAPI({ 
  endpoint: AppConfig.WPUrl,
  username,
  password,
  auth: true
});

//let res = create().createUser(user)
function * userc(user){
  const response = yield call(api.post('users',user), user)

    // success?
    if (response && response.ok) {
      yield response
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      //console.log(response.data)
    } else {
      yield response
      //console.log("fail")
      //console.log(response)
    }
}
//let gen = userc(user)

var apiPromise = WPAPI.discover( AppConfig.WPUrl ).then(function( site ) {
  return site.auth({
    username,
    password,
  });
});
apiPromise.then(function( site ) {
    // site is now configured to use authentication 
    console.log(site.users())
})
// apiPromise.then(function( site ) {
//   // site is now configured to use authentication 
//   console.log(site.orders())
//   site.users().post(user)
//   let response = site.users().create(user).then(function( resp ) {
//   console.log("user")
//   console.log(resp)
//   })
//   console.log(response)
// })
//let x = api.post('users',user)
//printObj(x)
//printObj(gen.next().value)
//printObj(gen.next().value)
//gen.next().value