import http from 'http'
import { checkHttpVersion, checkHttpMethod } from './utils/index'

const PORT = '8000'

const server = http.createServer(function (req, res) {
  try {
    /* TODO
     *  Check all headers/http versions match what they should be and are set (clean it up)
     *  Check if their is anything else to check with the above ^
     *
     * */

    const { host, connection, version, upgrade } = req?.headers
    const { httpVersion, method } = req
    const key = req?.headers?.['sec-websocket-key']
    const correctHttpVersion = checkHttpVersion(httpVersion)
    const correctHttpMethod = checkHttpMethod(method || '')
    if (
      !correctHttpMethod ||
      !correctHttpVersion ||
      !host ||
      host !== `http://localhost:${PORT}` ||
      !upgrade ||
      upgrade !== 'websocket' ||
      !key ||
      key !== '13' ||
      !connection ||
      connection != 'upgrade' ||
      !version
    ) {
      res.statusCode = 400
      res.write('Bad request!')
    }
  } catch (error) {
    res.statusCode = 500
    res.write(error)
  }

  res.end()
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
