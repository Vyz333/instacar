import { StyleSheet } from 'react-native'

const borderRadius = 10
export default StyleSheet.create({
  container: {
    borderTopLeftRadius:borderRadius,
    borderTopRightRadius:borderRadius,
    marginBottom:0
  },
  button: {
    borderTopLeftRadius:borderRadius,
    borderTopRightRadius:borderRadius,
  }
})
