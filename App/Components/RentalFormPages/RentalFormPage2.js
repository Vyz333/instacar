import React from 'react'
import {
  reduxForm
} from 'redux-form/immutable'
import validate from './RentalFormPage2Validation'
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
import {
  Sae
} from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text
} from 'react-native'
import Retrieval from '../Retrieval'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GoogleMapsAPIKey} from '../../Config/APIKeys'
import Colors from '../../Themes/Colors'
import styles from '../Styles/RentalFormStyle'
import {Theme,Theme2} from '../../Themes/FormTheme'

const RentalFormPage1 = (props) => {
  const {
    handleSubmit,
    previousPage,
  } = props
  
  return ( 
    <View style={{flex:1}}>
    <Form onSubmit={handleSubmit}> 
        <GooglePlacesAutocomplete
          placeholder='Lugar de Entrega'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          container={<View style={{flex:1,padding:5}}></View>}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GoogleMapsAPIKey,
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
          }}
          styles={{
            
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: Colors.secondaryLight
            }
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Lugar Actual"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'establishment'
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //renderRightButton={() => <FontAwesomeIcon name="search" size={30} color={Colors.secondary} />}
        />
        <GooglePlacesAutocomplete
          placeholder='Lugar de Retorno'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          container={<View style={{flex:1,padding:5}}></View>}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GoogleMapsAPIKey,
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
          }}
          styles={{
            
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: Colors.secondaryLight
            }
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Lugar Actual"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'establishment'
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //renderRightButton={() => <FontAwesomeIcon name="search" size={30} color={Colors.secondary} />}
        />
        <Retrieval/>
        <ActionsContainer style={styles.flexDirection}>
            <Button onPress={previousPage} theme={Theme2} icon="md-arrow-dropleft" iconPlacement="left" type="submit" className="next">Atrás</Button>
        </ActionsContainer>        
        <ActionsContainer style={styles.flexDirection}>
            <Button onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">Siguiente</Button>
        </ActionsContainer>
    </Form>
    </View>
  )
}

export default reduxForm({
  form: 'rental_form', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(RentalFormPage1)
