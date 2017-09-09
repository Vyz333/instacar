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
import { View,Text,Dimensions,Platform } from 'react-native'
import {ButtonGroup, Card,Button,SocialIcon,FormLabel, FormInput} from 'react-native-elements'
import {Button as FButton} from 'react-native-clean-form'
import PhotoUpload from 'react-native-photo-upload'

import styles from '../Styles/RentalFormStyle'
import Colors from '../../Themes/Colors'
import {Theme} from '../../Themes/FormTheme'

const { width, height } = Dimensions.get('window')
class RentalFormPage6 extends Component {
  constructor (props) {
    super(props);
    this._uploadLicense = this._uploadLicense.bind(this)
    this._uploadINE = this._uploadINE.bind(this)
    this._uploadAddress = this._uploadAddress.bind(this)

    this.state= {
      license:'',
      address:'',
      ine:'',
    }

  }
  _uploadLicense(img){
    this.setState({license:img})
  }
  _uploadINE(img){
    this.setState({ine:img})
  }
  _uploadAddress(img){
    this.setState({address:img}) 
  }
  render () {
    const {     
      handleSubmit,
      previousPage, 
    } = this.props

    const {
      address,
      license,
      ine
    } = this.state
    return (
    <View style={{flex:1}}>
    <Form onSubmit={handleSubmit}>  
      <Text style={{paddingTop:5,textAlign:'center'}}>Documentos</Text>

    <View style={{flex:5,marginTop:5,flexDirection: 'column',
        justifyContent: 'space-around'}}>
        <PhotoUpload
        onPhotoSelect={this._uploadAddress}
        >
        <View style={{width:width-8,padding:18,margin:8,alignSelf: 'stretch',backgroundColor:Colors.secondaryLight}}>
          <Text style={{textAlign:'center'}}>Comprobante de Domicilio</Text>
          <FontAwesomeIcon size={30} style={{textAlign:'center'}} name={address==''?'camera-retro':'check'}/>
        </View>
        </PhotoUpload>

        <PhotoUpload
        onPhotoSelect={this._uploadLicense}
        >
        <View style={{width:width-8,padding:18,margin:8,alignSelf: 'stretch',backgroundColor:Colors.secondaryLight}}>
          <Text style={{textAlign:'center'}}>Licencia de Conducir</Text>
          <FontAwesomeIcon size={30} style={{textAlign:'center'}} name={license==''?'camera-retro':'check'}/>
        </View>
        </PhotoUpload>

        <PhotoUpload
        onPhotoSelect={this._uploadINE}
        >
        <View style={{width:width-8,padding:18,margin:8,alignSelf: 'stretch',backgroundColor:Colors.secondaryLight}}>
          <Text style={{textAlign:'center'}}>INE ó IFE</Text>
          <FontAwesomeIcon size={30} style={{textAlign:'center'}} name={ine==''?'camera-retro':'check'}/>
        </View>
        </PhotoUpload>

        </View>
        <ActionsContainer>
        <FButton onPress={previousPage} theme={getThemeWithButtonBackground(Colors.secondary)} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</FButton>
    </ActionsContainer>        
    <ActionsContainer>
        <FButton disabled={true} onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</FButton>
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
})(RentalFormPage6)