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
  drawerHandle:{
    backgroundColor:Colors.primary,
    borderBottomRightRadius:8,
    borderTopRightRadius:8,
    position:'absolute',
    top:0,
    left:0,
    padding:Metrics.baseMargin/2,
  },
  drawerText:{
    color:Colors.white,
    //marginLeft:5,
    alignSelf:'center',
    fontSize:15,
  },
  smallButton:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems:'center',
    padding: Metrics.baseMargin,
    margin: Metrics.baseMargin,
  },
  switch:{
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems:'flex-start',
    //alignSelf:'flex-start',
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },
  actionContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent:'stretch',
    height: 45,
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
input: {
  
},
password: {
  
},
})
