export function isUnauthorized(status: number): boolean {
  return status === 401
}

export function isForbidden(status: number): boolean {
  return status === 403
}

export function isInternalServerError(status: number): boolean {
  return status === 500
}

export function mapErrors(data: any): string {
  let errors = ''

  if ((!data.errors && data.message) || data.messages) {
    return data.message || data.messages[0]
  }

  if (Array.isArray(data.errors)) {
    const hasStringErrors = typeof data.errors[0] === 'string'

    if (hasStringErrors) {
      return data.errors[0]
    }

    data.errors = data.errors[0]
  }
  for (const err in data.errors) {
    let errorRow = data.errors[err].join('</br>')
    if (!errorRow.endsWith('</br>')) {
      errorRow += '</br>'
    }

    errors += errorRow
  }
  return errors
}
