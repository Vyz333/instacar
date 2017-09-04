import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
import validate from './RentalFormPage1Validation'
import {
  ActionsContainer,
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
import {ButtonGroup, Card,Button} from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import CarSwiper from '../CarSwiper'
import SliderEntry from '../SliderEntry';
import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'
class RentalFormPage3 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selector_idx:0,
      isDateTimePickerVisible: false,
      deliveryDateTime:'',
      returnDateTime:'',
    }

  }

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible: true, selector_idx:0 });
  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible: true, selector_idx:1 });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    if(this.state.selector_idx == 0)
      this.setState({isDateTimePickerVisible: false,deliveryDateTime:date})
    else
      this.setState({isDateTimePickerVisible: false,returnDateTime:date})
  };


  render () {
    const {     
      handleSubmit,
      previousPage, 
    } = this.props
    const {     
      selector_idx,
      isDateTimePickerVisible,
      deliveryDateTime,
      returnDateTime,
    } = this.state
    Moment.locale('es');
    return (
    <View style={{flex:1}}>
    <Form onSubmit={handleSubmit}>  
    <View style={{flex:2}}>
      <ActionsContainer style={styles.datetimeButtonView}>
      <Button onPress={this._showDateTimePicker1} theme={Theme} 
      icon="md-calendar" iconPlacement="left"  className="next">
        ENTREGA: Fecha y Hora
      </Button>
      </ActionsContainer>
      <Text style={styles.centeredText}>{deliveryDateTime!=''&&Moment(deliveryDateTime).format('d MMM')}</Text>
      <ActionsContainer style={styles.datetimeButtonView}>
      <Button onPress={this._showDateTimePicker2} theme={Theme} icon="md-calendar" iconPlacement="left"  className="next">
        RETORNO: Fecha y Hora
      </Button>
      </ActionsContainer>
      <Text style={styles.centeredText}>{returnDateTime!=''&&Moment(returnDateTime).format('d MMM')}</Text>
      </View>
    <DateTimePicker
      isVisible={isDateTimePickerVisible}
      onConfirm={this._handleDatePicked}
      onCancel={this._hideDateTimePicker}
      mode='datetime'
    />
    <ActionsContainer>
    <Button onPress={previousPage} theme={{...Theme,  Button: {
    backgroundColor: Colors.secondary,
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    height: 45
  },}} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</Button>
    </ActionsContainer>        
    <ActionsContainer>
        <Button onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">
          Siguiente
        </Button>
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
})(RentalFormPage3)