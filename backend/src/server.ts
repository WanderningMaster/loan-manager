import express from "express";
import cookieParser from "cookie-parser";

import { logRequest } from "./middlewares/logRequest.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { initRoutes } from "./routes/router";

const server = express();

server.use(express.json());
server.use(logRequest);
server.use(cookieParser());

initRoutes();

server.use(errorHandler); //error handler should be last

export { server };