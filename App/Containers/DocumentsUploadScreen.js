import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay'
import APIKeys from '../Config/APIKeys'
import FilesUpload from '../Components/RentalFormPages/FilesUpload'



// Actions
//import AuthenticationActions from '../Redux/AuthenticationRedux'

import Colors from '../Themes/Colors'
// Styles
import styles from './Styles/DocumentsUploadScreenStyle'

class DocumentsUploadScreen extends Component {
  render () {
    const {loading} = this.props
    const {navigate} = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Spinner visible={loading} textStyle={{color: Colors.primaryDark}} />
          { this.gradient }
          {<FilesUpload 
            nextPage={()=>navigate('SelectCarScreen')} 
          />}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsUploadScreen)
