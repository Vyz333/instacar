import React from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect, bindActionCreators } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {Header} from 'react-native-elements'
import RentalForm from '../Components/RentalForm'
import Colors from '../Themes/Colors'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }
  render () {
    console.log(this.state)
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <RentalForm />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //bindActionCreators
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
