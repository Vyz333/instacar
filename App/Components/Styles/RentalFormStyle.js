import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'
import { ApplicationStyles } from '../../Themes/'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  page1: {
    flex:1,
    backgroundColor:Colors.transparent,
  },
  centeredText:{
    textAlign:'center',
    textShadowColor:Colors.secondaryDark,
    padding:Metrics.smallMargin,
    backgroundColor:Colors.silver
  },
  doubleButton:{
    flex:1,
    flexDirection:'row',
  },
  datetimeButtonView:{
    margin:Metrics.smallMargin,
    padding:Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
},
buttonsContainer:{
  flexDirection:'column',
  flex:6
},

})
