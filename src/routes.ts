import { Router } from "express";
import websocketRoutes from "./websocket/websocket.routes";

const routes = Router()

routes.use(
  "/websocket",
  websocketRoutes
)

export default routes