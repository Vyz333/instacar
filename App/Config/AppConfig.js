// Simple React Native specific changes

const WPUrl = 'https://instacar.mx'
export default {
  WPUrl: WPUrl,
  RESTUrl: WPUrl+'/wp-json/wp/v2/',
  JWTUrl: WPUrl+'/wp-json/jwt-auth/v1/',
  UPLOADSUrl: WPUrl+'/wp-content/uploads/',
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  carCategories: [],
  
}
