function checkHttpVersion(version: string) {
  try {
    if (!version) throw 'No data passed'

    const toNumber = Number(version)
    if (toNumber >= 1.1) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error
  }
}

function checkHttpMethod(method: string) {
  if (method !== 'GET') {
    return false
  }
  return true
}

export { checkHttpVersion, checkHttpMethod }
