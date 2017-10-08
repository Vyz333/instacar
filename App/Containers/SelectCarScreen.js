import React, { Component } from 'react'
import {View, Text,Dimensions, 
  ScrollView, KeyboardAvoidingView,Button as RNButton } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Themes/Colors'

import RentalFormPage1 from '../Components/RentalFormPages/RentalFormPage1'
// Actions
import RentalFormActions from '../Redux/RentalFormRedux'

// Styles
import styles from './Styles/SelectCarScreenStyle'

class SelectCarScreen extends Component {
  constructor(props) {
    super(props)
    if(!this.props.cars)this.props.fetchCars()
  }
  get gradient () {
      return (
          <LinearGradient
            colors={[Colors.silver, Colors.frost]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
      );
  }

  render () {
    const { cars, multiple } = this.props
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          { this.gradient }
          {cars && 
          <RentalFormPage1 cars={cars} 
          multiple={multiple}
          nextPage={() => navigate('ItineraryScreen')}/>
          }
        </View>
      </View>
    )
  }
}
defaultValues={
  driver:{key:0,label:'No',value:false},
  trip_type:{key:0,label:'Solo en ciudad',value:0},

  car:{cat:'Autos',idx:0},
  car_selection:[{cat:'Autos',idx:0}],
  multiple: false,
}

const mapStateToProps = (state) => {
  return {
    cars: state.rental.cars,
    multiple: state.form.rental_form?state.form.rental_form.values.multiple:false,
    initialValues: defaultValues,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCars: () => dispatch(RentalFormActions.carsRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCarScreen)