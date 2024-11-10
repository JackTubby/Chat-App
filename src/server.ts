import { createServer } from 'http'
import { checkHttpVersion, checkHttpMethod, generateWebsocketResponseKey } from './utils/index'
import crypto from 'crypto'

const PORT = '8000'
const MAGICKEY = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
const SEVEN_BITS_INT_MARKER = 125
const SIXTEEN_BITS_INT_MARKER = 126
const SIXTY_FOUR_BITS_INT_MARKER = 127
const MASK_KEY_BYTES_LENGTH = 4

const server = createServer((req, res) => {
  res.writeHead(200)
  res.end('Hello')
}).listen(PORT, () => console.log(`Server listening on port ${PORT}`))

server.on('upgrade', onSocketUpgrade)

function onSocketUpgrade(req: any, socket: any, head: any) {
  try {
    const { 'sec-websocket-key': webClientSocketKey } = req.headers
    console.log(`${webClientSocketKey} connected!`)
    const headers = prepareHandshakeHeaders(webClientSocketKey)

    socket.write(headers)
    socket.on('readable', () => onSocketReadable(socket))
  } catch (error) {
    console.error('Error onSocketUpgrade', error)
  }
}

function onSocketReadable(socket: any) {
  socket.read(1) // consume opcode

  const [markerAndPayloadLength] = socket.read(1)
  console.log('markerAndPayloadLength', markerAndPayloadLength)
  // because the first bit is always 1 for client-to-server messages
  // consume one bit to remove the MASK bit
  const lengthIndicator = markerAndPayloadLength - 128
  console.log('lengthIndicator', lengthIndicator)

  let messageLength = 0
  if (lengthIndicator <= SEVEN_BITS_INT_MARKER) {
    messageLength = lengthIndicator
  } else {
    throw new Error('Your message is too long, we do not handle 64 bit messages')
  }

  const maskKey = socket.read(MASK_KEY_BYTES_LENGTH)
  const encoded = socket.read(messageLength)
  const decoded = unmask(encoded, maskKey)
  const received = decoded.toString('utf8')
  const data = JSON.parse(received)
  console.log("Messaged received!", data)
}

function unmask(encodedBuffer: any, maskKey: any) {
  const finalBuffer = Buffer.from(encodedBuffer);

  // Mask key has 4 bytes
  // index % 4 === 0, 1, 2, 3 = index bits needed to decode the message

  // XOR ^
  // returns 1 if both are different
  // returns 0 if both are the same

  // Decode the message using the mask key
  // (71).toString(2).padStart(8, '0') =      0 1 0 0 0 1 1 1
  // (53).toString(2).padStart(8, '0') =      0 0 1 1 0 1 0 1
  // (71 ^ 53).toString(2).padStart(8, '0') = 0 1 1 1 0 0 1 0
  // String.fromCharCode(parseInt('01110010', 2)) = 'r'
  for(let i = 0; i < encodedBuffer.length; i++) {
    finalBuffer[i] = encodedBuffer[i] ^ maskKey[i % MASK_KEY_BYTES_LENGTH];
  }
  return finalBuffer;
}

function prepareHandshakeHeaders(id: any) {
  const acceptKey = createSocketAccept(id)
  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
    '',
  ]
    .map((line) => line.concat('\r\n'))
    .join('')
  return headers
}

function createSocketAccept(id: string) {
  const encryption = crypto.createHash('sha1')
  encryption.update(id + MAGICKEY)
  return encryption.digest('base64')
}

;['uncaughtException', 'unhandledRejection'].forEach((e) => {
  process.on(e, (err) => {
    console.error(`Something went wrong: ${e}`, `message: ${err.stack || err}`)
  })
})
