import http from 'http'
import { checkHttpVersion } from './utils/index'

const PORT = '8000'

const server = http.createServer(function (req, res) {
  try {
    /* TODO
     *  Check all headers/http versions match what they should be and are set (clean it up)
     *  Check if their is anything else to check with the above ^
     * 
     * */



    if (!req.method || req.method !== 'GET') {
      throw new Error('Not correct HTTP method')
    }
    const httpVersion = req.httpVersion
    const correctHttpVersion = checkHttpVersion(httpVersion)
    const correctHttpMethod = true
    const host = req?.headers?.host
    const connection = req?.headers?.connection
    const key = req?.headers?.['sec-websocket-key']
    const version = req?.headers?.version
  } catch (error) {
    res.statusCode = 500
    res.write(error)
  }

  res.end()
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
