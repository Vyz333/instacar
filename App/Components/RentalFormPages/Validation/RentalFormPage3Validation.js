const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Requerido'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Dirección de correo no valida'
  }
  return errors
}

export default validate