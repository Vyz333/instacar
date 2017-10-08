import React,{Component} from 'react'
import { connect } from 'react-redux'

import {
  ActionsContainer,
  Form,
} from 'react-native-clean-form'

import {Button as FButton} from 'react-native-clean-form'
import {
  View,
  Text,
  KeyboardAvoidingView
} from 'react-native'
import { FormLabel, FormInput,Button, Card } from 'react-native-elements'
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import {Theme} from '../../Themes/FormTheme'
import Selectbox from 'react-native-selectbox'
import {
  WaveIndicator,
} from 'react-native-indicators';


class RentalFormPage4 extends Component {
  render(){
  const {
    nextPage,
    cancel,
    fetching,
  } = this.props

  let ready = !fetching && false
  return ( 
    <View style={{flex:1,flexDirection: 'column',justifyContent: 'space-between'}}>
      <View style={{flex:1}}>
        <Card
          containerStyle={{flex:1,margin:8,marginBottom:8,backgroundColor:Colors.primary}}
          title={'Esperando confirmación'}
          titleStyle={{fontSize:19,color:Colors.backgroundLight}}
          >
          <View style={{padding:18, margin:30}}>
          <WaveIndicator  size={100} color='white' waveMode='outline'/>
          </View>
          <Text style={{fontSize:18,color:Colors.ricePaper,margin: 10,textAlign:'center'}}>
            Este proceso puede tardar varios minutos, puedes cambiarte de app mientras tanto. En breve recibirás una notificación con la respuesta de disponibilidad.
          </Text>
          <Button
            raised
            small
            containerViewStyle={{marginTop:10}}
            icon={{name: 'cancel'}}
            title='CANCELAR' 
            onPress={cancel}
            backgroundColor={Colors.error}
            />
        </Card>
      </View>
    <ActionsContainer>
    </ActionsContainer>
    </View>

  )
}
}

export default RentalFormPage4