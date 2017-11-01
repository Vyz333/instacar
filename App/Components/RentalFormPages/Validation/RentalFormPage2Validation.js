const validate = values => {
  const errors = {}
  if (!values.delivery_address) {
    errors.delivery_address = 'Requerido'
  }
  if (!values.return_address) {
    errors.return_address = 'Requerido'
  }
  if (!values.delivery_datetime) {
    errors.delivery_datetime = 'Requerido'
  }
  if (!values.return_datetime) {
    errors.return_datetime = 'Requerido'
  }

  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}

export default validate