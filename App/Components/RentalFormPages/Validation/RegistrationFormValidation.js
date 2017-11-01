const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Requerido'
  }
  if (!values.lastName) {
    errors.lastName = 'Requerido'
  }
  if (!values.email) {
    errors.email = 'Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Dirección no valida'
  }
  if (!values.password) {
    errors.password = 'Requerido'
  }
  if (!values.passwordd) {
    errors.passwordd = 'Requerido'
  }

  if (values.passwordd!=values.password) {
    errors.password = 'Las contraseñas no coinciden'
  }
  return errors
}

export default validate