// Simple React Native specific changes

const WPUrl = 'http://instacar.bismarck.space'
export default {
  WPUrl: WPUrl,
  RESTUrl: WPUrl+'/wp-json/wp/v2/',
  JWTUrl: WPUrl+'/wp-json/jwt-auth/v1/',
  UPLOADSUrl: WPUrl+'/wp-content/uploads/',
  // font scaling override - RN default is on
  allowTextFontScaling: true
}
