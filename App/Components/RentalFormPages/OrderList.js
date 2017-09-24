import React,{Component} from 'react'
import {
  reduxForm
} from 'redux-form/immutable'
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
import { Field } from 'redux-form'; 
import {Button as FButton} from 'react-native-clean-form'
import {
  View,
  Text,
  TextInput,
  ListView,
  FlatList,
} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import AddressField from '../AddressField'
import DateTimeField from '../DateTimeField'
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import {Theme,getThemeWithButtonBackground} from '../../Themes/FormTheme'
const orders_data = [
  {
  type:'Sedan',
  id:1,
  delivery_address: 'Colinas de Montecarlo 52, Satélite',
  return_address: 'Colinas de Montecarlo 52, Satélite',
  delivery_datetime: '12:00 21/09/2017',
  return_datetime: '16:00 29/09/2017',
  username: 'bismarck',
  },
  {
    type:'SUV',
    id:2,
    delivery_address: 'Colinas de Montecarlo 52, Satélite',
    return_address: 'Colinas de Montecarlo 52, Satélite',
    delivery_datetime: '19:00 8/09/2017',
    return_datetime: '16:00 29/10/2017',
    username: 'bismarck',
    },
    {
      type:'De Pasajeros',
      id:4,
      delivery_address: 'Colinas de Montecarlo 52, Satélite',
      return_address: 'Colinas de Montecarlo 52, Satélite',
      delivery_datetime: '19:00 8/09/2017',
      return_datetime: '16:00 29/10/2017',
      username: 'bismarck',
      }
  ]

export default class OrderList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    console.log(orders_data)
    const {
      nextPage,
      previousPage,
    } = this.props
    return (
      <FlatList
      data={[
  {
    key:1,
    type:'Sedan',
    delivery_address: 'Colinas de Montecarlo 52, Satélite',
    return_address: 'Colinas de Montecarlo 52, Satélite',
    delivery_datetime: '12:00 21/09/2017',
    return_datetime: '16:00 29/09/2017',
    username: 'bismarck',
    },
    {
      key:2,
      type:'SUV',
      delivery_address: 'Colinas de Montecarlo 52, Satélite',
      return_address: 'Colinas de Montecarlo 52, Satélite',
      delivery_datetime: '19:00 8/09/2017',
      return_datetime: '16:00 29/10/2017',
      username: 'bismarck',
      },
      {
        key:3,
        type:'De Pasajeros',
        delivery_address: 'Colinas de Montecarlo 52, Satélite',
        return_address: 'Colinas de Montecarlo 52, Satélite',
        delivery_datetime: '19:00 8/09/2017',
        return_datetime: '16:00 29/10/2017',
        username: 'bismarck',
        }
      ]}



      renderItem={(rowData) => {console.log(rowData.item.username); return(<Card title={'#0000'+rowData.item.key}><Text>{rowData.item.type}</Text>
        <Text>{rowData.item.delivery_address}</Text>
        <Text>{rowData.item.delivery_datetime}</Text>
        <Text>{rowData.item.return_address}</Text>
        <Text>{rowData.item.return_datetime}</Text>
      </Card>)}
      }
    />
      
    );
  }
}
