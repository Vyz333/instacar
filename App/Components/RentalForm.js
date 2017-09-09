import React, { Component } from 'react'
import {View, Text,Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable'
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles/RentalFormStyle'
import Colors from '../Themes/Colors'
import RentalFormPage1 from './RentalFormPages/RentalFormPage1'
import RentalFormPage2 from './RentalFormPages/RentalFormPage2'
import RentalFormPage3 from './RentalFormPages/RentalFormPage3'
import RentalFormPage4 from './RentalFormPages/RentalFormPage4'
import RentalFormPage5 from './RentalFormPages/RentalFormPage5'
import RentalFormPage6 from './RentalFormPages/RentalFormPage6'

export default class RentalForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  
  nextPage() {
    console.log("Next Pressed")
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }
  // Prop type warnings
  /*static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }*/
  get gradient () {
      return (
          <LinearGradient
            colors={[Colors.silver, Colors.secondaryLight]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
      );
  }
  render () {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <View style={{flex:1}}>
        { this.gradient }
        {page === 1 && <RentalFormPage1 onSubmit={this.nextPage}/>}
        {page === 2 && <RentalFormPage2 previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <RentalFormPage3 previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 4 && <RentalFormPage4 previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 5 && <RentalFormPage5 previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 6 && <RentalFormPage6 previousPage={this.previousPage} onSubmit={this.nextPage}/>}
      </View>
    )
  }
}
