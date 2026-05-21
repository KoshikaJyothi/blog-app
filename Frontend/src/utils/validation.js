export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateForm = (formData, fields) => {
  const errors = {}

  fields.forEach(field => {
    switch (field.type) {
      case 'email':
        if (!formData[field.name]) {
          errors[field.name] = `${field.label} is required`
        } else if (!validateEmail(formData[field.name])) {
          errors[field.name] = 'Invalid email format'
        }
        break

      case 'password':
        if (!formData[field.name]) {
          errors[field.name] = `${field.label} is required`
        } else if (!validatePassword(formData[field.name])) {
          errors[field.name] = 'Password must be at least 6 characters'
        }
        break

      case 'text':
        if (!formData[field.name]?.trim()) {
          errors[field.name] = `${field.label} is required`
        }
        break

      case 'textarea':
        if (!formData[field.name]?.trim()) {
          errors[field.name] = `${field.label} is required`
        } else if (formData[field.name].length < 10) {
          errors[field.name] = `${field.label} must be at least 10 characters`
        }
        break

      case 'select':
        if (!formData[field.name]) {
          errors[field.name] = `${field.label} is required`
        }
        break

      case 'file':
        if (!formData[field.name]) {
          errors[field.name] = `${field.label} is required`
        } else {
          const file = formData[field.name]
          const validTypes = ['image/jpeg', 'image/png', 'image/gif']
          if (!validTypes.includes(file.type)) {
            errors[field.name] = 'Only JPG, PNG, GIF allowed'
          }
          if (file.size > 5 * 1024 * 1024) {
            errors[field.name] = 'File size must be less than 5MB'
          }
        }
        break

      default:
        break
    }
  })

  return errors
}
