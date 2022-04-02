import 'dotenv/config';
import mongoose from "mongoose";
import { logger } from '../../services/logger/logger.service';

const {
    CONNECTION_STRING
} = process.env;

const connection = mongoose.connect(CONNECTION_STRING as string);

export {connection};