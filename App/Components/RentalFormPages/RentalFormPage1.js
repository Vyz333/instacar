import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
import validate from './RentalFormPage1Validation'
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  FormGroup,
  FieldSet,
  Form,
  Label
} from 'react-native-clean-form'
import {
  Input,
  Select,
  Switch
} from 'react-native-clean-form/redux-form-immutable'
import {Sae} from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View,Text,Dimensions } from 'react-native'
import {ButtonGroup} from 'react-native-elements'
import CarSwiper from '../CarSwiper'
import SliderEntry from '../SliderEntry';
import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'

const CAR_CAT_FIRST_ITEM = 0;
class RentalFormPage1 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: CAR_CAT_FIRST_ITEM
    }
    this._updateIndex = this._updateIndex.bind(this)
  }
  _updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  render () {
    const buttons = ['Sedan', 'SUV', 'Pasajeros']
    const { handleSubmit } = this.props
    const { selectedIndex } = this.state
    return (
      <View style={{flex:1}}>
      <Form onSubmit={handleSubmit}>  
      <CarSwiper category={selectedIndex}/> 
          <ButtonGroup
          onPress={this._updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedBackgroundColor={Colors.secondary}
          />
          <ActionsContainer>
              <Button onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</Button>
          </ActionsContainer>
      </Form>
      </View>
    )
  }
}

export default reduxForm({
  form: 'rental_form',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(RentalFormPage1)