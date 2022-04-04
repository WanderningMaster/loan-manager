import express from "express";
import 'dotenv/config';
import { logger } from "./services/logger/logger.service";
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
app.use("/api/user", userRouter);

app.listen(SERVER_PORT, () => {
    logger.info(`Server running on ${SERVER_PORT} port`);
})