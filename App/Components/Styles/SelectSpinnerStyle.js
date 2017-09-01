import { StyleSheet,Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');
import Colors from '../../Themes/Colors'
const borderColor= Colors.primaryDark
const backgroundColor= Colors.backgroundLight
export default StyleSheet.create({

	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		backgroundColor,
	},
	innerCircle: {
		position: 'absolute', 
		top:0, left:0, bottom: 0, right: 0,
		borderWidth: 3 * StyleSheet.hairlineWidth,
		borderColor,
		backgroundColor,
	},
	outerCircle: {
		position: 'absolute', 
		top:0, left:0, bottom: 0, right: 0,
		borderWidth: 4 * StyleSheet.hairlineWidth,
		borderColor,
		backgroundColor,
	},
	gap:{
		borderWidth: 4 * StyleSheet.hairlineWidth,
		borderColor:'transparent',
		backgroundColor,	
	},
})
