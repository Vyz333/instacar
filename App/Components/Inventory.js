import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/InventoryStyle'
import {
  ActionsContainer,
} from 'react-native-clean-form'
import { List, ListItem, Button } from 'react-native-elements'
import Colors from '../Themes/Colors'
export default class Inventory extends Component {
  // Prop type warnings
  static propTypes = {
    inventory: PropTypes.array,
  }
  // Defaults for props
  static defaultProps = {
    inventory: []
  }
  _keyExtractor = (item, index) => index;

  _renderItem = ({item,index}) => {
    const {cars,onRemoveItem} = this.props
    const car = cars[item.cat][item.idx]
    return (
      <ListItem
        key={index}
        id={index}
        title={car.title}
        subtitle={car.subtitle}
        avatar={{uri:car.illustration}}
        rightIcon={{name:'cancel'}}
        onPressRightIcon={()=>{console.log(index);onRemoveItem(index)}}
      />
    )
  }
  render () {
    const {cars,inventory,closeInventory} = this.props
    if(!cars) return null

    return (
      <View style={styles.container}>
        <Text style={{marginTop:8,textAlign:'center',fontWeight:'bold',fontStyle:'italic'}} >
        CARROS A RESERVAR
        </Text>
        <View style={{flex:1}}>
        <List>
          <FlatList
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            data={inventory}
          />
        </List>
        {(!inventory||inventory.length<1)&&
        <Text 
        style={{color:Colors.charcoal,
          fontSize:30,margin:8,
          alignSelf:'center',
          textAlign:'center',fontWeight:'bold'}}
        >
        No has agregado ningún carro a tu inventario!
        </Text>}
        </View>
        <ActionsContainer >
            <Button 
            title='REGRESAR' 
            onPress={closeInventory} 
            icon={{name: 'navigate-before',color:Colors.primary}}
            color={Colors.primary}
            backgroundColor={Colors.white}
            iconLeft
            containerStyle={{
              flex:1,
              flexDirection:'row',
              margin:0,
              alignSelf:'flex-end',
            }}
            />
        </ActionsContainer>
      </View>
    )
  }
}
