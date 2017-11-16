import { StyleSheet } from 'react-native'
import Metrics from '../../Themes/Metrics'
export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  }
})
