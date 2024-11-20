import express from 'express'
const PORT = '8000'
import routes from './routes'
import { onSocketUpgrade } from './websocket/websocket.handle'


const app = express()
// app.use(routes)

  const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

server.on('upgrade', onSocketUpgrade)

