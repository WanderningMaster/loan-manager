import express from "express";

import 'dotenv/config';
import { logger } from "./services/logger/logger.service";
import { logRequest } from "./middlewares/logRequest.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import { connection } from "./data/db/connection";

import { userRouter } from "./api/user/user.router";

const { 
    SERVER_PORT,
} = process.env;

const app = express();

connection
    .then(async () => {
        logger.info("Database successfully connected");
    })
    .catch(err => {
        logger.error(err);
    })

app.use(express.json());
app.use(logRequest);

app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
    logger.info(`Server running on ${SERVER_PORT} port`);
});