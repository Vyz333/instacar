import React, { Component,PureComponent } from 'react'
import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableOpacity, Modal} from 'react-native'
import styles from './Styles/OrdersListViewStyle'
import {FormLabel,Card, Icon, Button } from 'react-native-elements'
import {Button as RNButton} from 'react-native'
import Colors from '../Themes/Colors'


const tripOptions = [
  {label:'Solo en ciudad',iconName:'location-city'},
  {label:'Fuera del estado',iconName:'rv-hookup'},
  {label:'En ciudad y zona rural',iconName:'landscape'},
]
const statusOptions = [
  'Inactiva',
  'Asignada',
  'Vehículo Entregado a Cliente',
  'Vehículo Recogido de Cliente',
  'Vehículo Retornado',
  'Completa',
]

export default class OrdersListView extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedItem:null
    }
  }
  _keyExtractor = (item, index) => item.id;
  
  _onPressItem = (item) => {
    this.setState({selectedItem:item})
  }

  _renderItem = ({index,item}) => (
      <TouchableOpacity onPress={()=>{this._onPressItem(item)}}>
      <Card title={item.title.rendered}>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Tipo de Recorrido:</Text>
        <Text style={styles.cardTextR}>{tripOptions[parseInt(item.trip_type)].label}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Carro:</Text>
        <Text style={styles.cardTextR}>{item.car_model}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Entrega:</Text>
        <Text style={styles.cardTextR}>{item.datetime_delivery}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Retorno:</Text>
        <Text style={styles.cardTextR}>{item.datetime_return}</Text>
      </View>
    </Card>
    </TouchableOpacity>
  )
  itemDetails = (item) => {
    console.log(item)
    if(item){
      const trip = tripOptions[parseInt(item.trip_type)]
      return(
      <View style={{flex:1,margin:18, padding:18, borderColor:Colors.primaryDark, borderWidth:1}} >
      <Text h1>{item.title.rendered}</Text>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Estatus:</Text>
        <Text style={styles.cardTextR}>{statusOptions[parseInt(item.current_status)]}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Tipo de Recorrido:</Text>
        <Text style={styles.cardTextR}>{trip.label}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Carro:</Text>
        <Text style={styles.cardTextR}>{item.car_model}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Entrega:</Text>
        <Text style={styles.cardTextR}>{item.datetime_delivery}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Retorno:</Text>
        <Text style={styles.cardTextR}>{item.datetime_return}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Requiere Chofer:</Text>
        <Text style={styles.cardTextR}>{item.driver=='1'?'Sí':'No'}</Text>
      </View>
      <View style={styles.cardTextSegment}>
        <Text style={styles.cardTextL}>Requiere Seguro:</Text>
        <Text style={styles.cardTextR}>Sí</Text>
      </View>
      <Button
        onPress={this.props.acceptOrder}
        icon={{name: 'check'}}
        backgroundColor={'green'}
        containerViewStyle={{flex:1,flexDirection:'row',
        padding:10,marginBottom:10,marginLeft:0,marginRight:0}}
        title='CONFIRMAR DISPONIBILIDAD' />
      <Button
        onPress={this.props.declineOrder}
        icon={{name: 'close'}}
        backgroundColor={Colors.error}
        containerViewStyle={{flex:1,flexDirection:'row',
        padding:10,marginBottom:10,marginLeft:0,marginRight:0}}
        title='NO TENGO DISPONIBILIDAD' />
      </View>
      
      )
    }
  }
  render () {
    const {orders} = this.props
    const {selectedItem} = this.state
    console.log(selectedItem)
    return (
      <View style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedItem!=null}
          onRequestClose={() => {this.setState({selectedItem:null})}}>
          <View style={{flex:1}} >
          {this.itemDetails(selectedItem)}
          </View>
        </Modal>
      </View>
    )
  }
}
