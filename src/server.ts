import express, { Request, Response } from 'express'

const app = express()

const port: number = 8000

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello from the server!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
