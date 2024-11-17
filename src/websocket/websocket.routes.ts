import { Router } from "express";
// TODO: import handlers

const websocketRoutes = Router()

websocketRoutes.get("/", (req, res) => {
  console.log("This is the websocket get route")
  res.send("This is the websocket get route")
})

export default websocketRoutes
