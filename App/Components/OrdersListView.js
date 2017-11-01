import React, { Component,PureComponent } from 'react'
import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableOpacity, Modal} from 'react-native'
import styles from './Styles/OrdersListViewStyle'
import {FormLabel,Card, Icon, Button,ButtonGroup } from 'react-native-elements'
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
      selectedItem:null,
      modalOpen:false,
      page: 0
    }
  }
  
  _keyExtractor = (item, index) => item.id;
  
  _onPressItem = (item) => {
    this.setState({selectedItem:item,modalOpen:true})
  }

  _renderItem = ({index,item}) => (
      <TouchableOpacity onPress={()=>{
        if(this.state.page==0)
          this._onPressItem(item);
      }}>
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
      <View style={{flex:1,flexDirection:'column',margin:18, padding:18, 
      borderColor:Colors.primaryDark, borderWidth:1}} >
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

      <RNButton
        onPress={()=>{
          this.props.acceptOrder(item);
          this.setState({modalOpen:false});
          }}
        icon={{name: 'check'}}
        style={{padding:10}}
        color={Colors.green}
        title='CONFIRMAR DISPONIBILIDAD' />

      <RNButton
        onPress={()=>{
          this.props.declineOrder(item);
          this.setState({modalOpen:false});
          }}
        icon={{name: 'close'}}
        style={{padding:10}}
        color={Colors.error}
        title='NO TENGO DISPONIBILIDAD' />
      </View>
      
      )
    }
  }
  render () {
    const {auth} = this.props
    const orders = this.props.orders?this.props.orders:[]
    const {selectedItem,modalOpen,page} = this.state
    const tabs = ['Abiertas','Mis Órdenes']
    console.log(orders,auth)
    return (
      <View style={styles.container}>
      <ButtonGroup
        
        onPress={(newpage)=>this.setState({page:newpage})}
        selectedIndex={page}
        buttons={tabs}
        selectedBackgroundColor={Colors.secondary}
        selectedTextStyle={{color:Colors.white}}
        />

          <FlatList
            data={page==0?
            orders.filter(order=>order.current_status==0):
            orders.filter(order=>order.current_status!=0 && order.renter==auth.id)}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalOpen}
          onRequestClose={() => {this.setState({selectedItem:null,modalOpen:false})}}>
          <View style={{flex:1}} >
          {this.itemDetails(selectedItem)}
          </View>
        </Modal>
      </View>
    )
  }
}
