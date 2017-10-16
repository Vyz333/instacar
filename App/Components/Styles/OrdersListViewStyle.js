import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
  cardTextL: {
    textAlign: 'left',
    color:Colors.darkCoal,
  },
  cardTextR: {
    textAlign: 'right',
    color:Colors.primaryDark,
    fontWeight: 'bold',
  },
  cardTextSegment:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  }
})
