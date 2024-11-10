import crypto from 'crypto'

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

function generateWebsocketResponseKey(key: string, string: string) {
  if (!key) return false
  if (!string) return false

  const hash = crypto.createHash('sha1')
  hash.update(key)
  hash.update(string)
  return hash.digest('base64')
}

export { checkHttpVersion, checkHttpMethod, generateWebsocketResponseKey }
