import Colors from './Colors'

const Theme = {
  Button: {
    backgroundColor: Colors.primaryDark,
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    height: 45
  },
  ErrorMessage: {
    color: 'red',
    fontSize: 10,
    marginBottom: 15,
    textAlign: 'right'
  },
  Fieldset: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    labelColor: '#909090',
    labelSize: 9,
    labelWeight: 700,
    labelHeight: 25,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
  },
  FormGroup: {
    borderColor: '#ebebeb',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    errorBorderColor: 'red',
    height: 35,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  BaseInput: {
    placeholderColor: '#c9c9c9',
    fontSize: 12,
    lineHeight: 18
  },
  Input: {
    color: '#313131',
  },
  Label: {
    color: '#bfc2c9',
    fontSize: 12,
    stackedHeight: 40
  },
  Select: {

  }
}
getThemeWithButtonBackground= (background)=> 
{
  return(
  {
...Theme,
Button: {
  backgroundColor: background,
  color: '#fff',
  fontSize: 12,
  fontWeight: 700,
  height: 45
}
  }
)
}

export { // without default
  Theme,
  getThemeWithButtonBackground,
}
