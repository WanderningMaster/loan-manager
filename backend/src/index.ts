import 'dotenv/config';

import { server } from "./server";
import { logger } from "./services/logger/logger.service";
import { connection } from "./data/db/connection";

const { 
    SERVER_PORT,
} = process.env;

connection
    .then(async () => {
        logger.info("Database successfully connected");
    })
    .catch(err => {
        logger.error(err);
    })

server.listen(SERVER_PORT, () => {
    logger.info(`Server running on ${SERVER_PORT} port`);
});