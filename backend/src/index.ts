import express from "express";
import 'dotenv/config';
import { logger } from "./services/logger/logger.service";
import { connection } from "./data/db/connection";

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

app.listen(SERVER_PORT, () => {
    logger.info(`Server running on ${SERVER_PORT} port`);
})