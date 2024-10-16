function checkHttpVersion(version: string) {
  try {
    if (!version) throw 'No data passed'

    const toNumber = Number(version)
    console.log('the number', toNumber)
    if (toNumber >= 1.1) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error
  }
}

export {
  checkHttpVersion,
}