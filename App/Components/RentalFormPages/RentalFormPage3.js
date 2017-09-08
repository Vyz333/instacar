import React,{ Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
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


import {Theme} from '../../Themes/FormTheme'
class RentalFormPage3 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selector_idx:0,
    }

  }

  render () {
    return(
      <Form style={styles.container}>
        <FieldsContainer>
          <Fieldset label="Contact details">
            <FormGroup>
              <Label>First name</Label>
              <Input placeholder="Nombre" onChangeText={this.onFirstNameChange} />
              <Text>Email:</Text>
              <Input name="email" />
            </FormGroup>
        </Fieldset>
       </FieldsContainer>
      <ActionsContainer>
        <Button onPress={handleSubmit} theme={Theme} icon="md-arrow-dropright" iconPlacement="right" type="submit" className="next">
          Siguiente
        </Button>
      </ActionsContainer>
    </Form>
    )
  }
}

export default reduxForm({
  form: 'rental_form',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(RentalFormPage3)