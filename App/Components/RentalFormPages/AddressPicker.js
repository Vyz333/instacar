import React,{Component} from 'react'

import {
  View,
  Text,
  Modal
} from 'react-native'
import Retrieval from '../Retrieval'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GoogleMapsAPIKey} from '../../Config/APIKeys'

import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import {Theme,getThemeWithButtonBackground} from '../../Themes/FormTheme'

export default class AddressPicker extends Component {
  constructor (props) {
    super(props);

  }
  render(){
  const {
    modalVisible,
    placeholder,
    address,
    pickAddressHandler,
  } = this.props
  console.log(placeholder)
  return ( 
    <View style={{flex:1}}>
          <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {alert("Dirección Seleccionada:\n"+address)}}
          >
          <Retrieval/>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => <Text key={row.key}>{row.description}</Text>} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
            pickAddressHandler(data)
          }}
          getDefaultValue={() => {
            return address; // text input default value
          }}
          container={<View style={{flex:1,padding:5}}></View>}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAOnTpO_hIrjvE1KgMqYjBc9IXUwuHezbI',
            language: 'es', // language of the results
            types: 'address' // default: 'geocode'
          }}
          styles={{
            position:'fixed',
            top:0,
            left:0,
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: Colors.secondaryLight,
              backgroundColor: Colors.backgroundLight,

            },
            listView: {
              backgroundColor: Colors.backgroundLight,
            }
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel='Lugar Actual'
          nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            language:'es'//language:'en'
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //renderRightButton={() => <FontAwesomeIcon name="search" size={30} color={Colors.secondary} />}
        />
        
        </Modal>
    </View>
  )
}
}
