import React,{Component} from 'react'
import {
  reduxForm
} from 'redux-form/immutable'
import Moment from 'moment';
import validate from './RentalFormPage2Validation'
import {
  ActionsContainer,
  FieldsContainer,
  Fieldset,
  FormGroup,
  FieldSet,
  Form,
  Label
} from 'react-native-clean-form'
import {Button as FButton} from 'react-native-clean-form'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
} from 'react-native'
import { Button,Icon } from 'react-native-elements';
import AddressPicker from './AddressPicker'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import {Theme,getThemeWithButtonBackground} from '../../Themes/FormTheme'

class RentalFormPage2 extends Component {
  constructor (props) {
    super(props);
    this._handleAddressPicked = this._handleAddressPicked.bind(this)

    this.state = {
      //Time selector
      time_selector_idx:0,
      isDateTimePickerVisible: false,
      deliveryDateTime:'',
      returnDateTime:'',
      //Date selector
      modalVisible: false,
      deliveryAddress: '',
      returnAddress: '',
      mode:0,
    }
  }
  _showAddressPicker1 = () => this.setState({ modalVisible: true, mode:0 });
  _showAddressPicker2 = () => this.setState({ modalVisible: true, mode:1 });
  _handleAddressPicked(addr){
    if(this.state.mode===0)
      this.setState({deliveryAddress:addr,modalVisible:false})
    else
      this.setState({returnAddress:addr,modalVisible:false})
  }

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible: true, selector_idx:0 });
  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible: true, selector_idx:1 });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log(this.state)
    if(this.state.selector_idx == 0)
      this.setState({isDateTimePickerVisible: false,deliveryDateTime:date})
    else
      this.setState({isDateTimePickerVisible: false,returnDateTime:date})
  };
  render(){
  const {
    handleSubmit,
    previousPage,
  } = this.props
  const {   
    //Time picker state
    selector_idx,
    isDateTimePickerVisible,
    deliveryDateTime,
    returnDateTime,
    //Date picker state
    modalVisible,
    deliveryAddress,
    returnAddress,
  } = this.state

  return ( 
    
    <Form onSubmit={handleSubmit}> 
      <View style={{flex:1,marginTop:10,flexDirection: 'column',
        justifyContent: 'space-between'}}>
        <View style={{flex:1}}>
        <Button
          raised
          icon={{name: 'my-location'}}
          buttonStyle={{backgroundColor: Colors.primaryLight}}
          textStyle={{textAlign: 'center'}}
          title={`Dirección de Entrega${deliveryAddress?':\n '+deliveryAddress.description:''}`}
          onPress={this._showAddressPicker1}
        />
        </View>

        <View style={{flex:1}}>
        <Button
          raised
          icon={{name: 'date-range'}}
          buttonStyle={{backgroundColor: Colors.primaryLight}}
          textStyle={{textAlign: 'center'}}
          title={`Hora y Fecha de Entrega${deliveryDateTime?':\n '+Moment(deliveryDateTime).format('d MMM'):''}`}
          onPress={this._showDateTimePicker1}
        />
        </View>
        
        <View style={{flex:1}}>
        <Button
          raised
          icon={{name: 'directions'}}
          buttonStyle={{backgroundColor: Colors.primaryLight,flex:2}}
          textStyle={{textAlign: 'center'}}
          title={`Dirección de Retorno${returnAddress?':\n '+returnAddress.description:''}`}
          onPress={this._showAddressPicker2}
        />
        </View>
        <View style={{flex:1}}>
        <Button
          raised
          icon={{name: 'date-range'}}
          buttonStyle={{backgroundColor: Colors.primaryLight,flex:2}}
          textStyle={{textAlign: 'center'}}
          title={`Hora y Fecha de Retorno${returnDateTime?':\n '+Moment(returnDateTime).format('d MMM'):''}`}
          onPress={this._showDateTimePicker2}
        />
        </View>
        <AddressPicker pickAddressHandler={this._handleAddressPicked}modalVisible={modalVisible} deliveryAddress={deliveryAddress} returnAddress={returnAddress}/>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='datetime'
        />
        <ActionsContainer>
            <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</FButton>
        </ActionsContainer>        
        <ActionsContainer>
            <FButton onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</FButton>
        </ActionsContainer>
        </View>
    </Form>

  )
}
}

export default reduxForm({
  form: 'rental_form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(RentalFormPage2)
