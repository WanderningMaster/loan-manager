import 'dotenv/config';
import mongoose from "mongoose";

const {
    CONNECTION_STRING
} = process.env;

const connection = mongoose.connect(CONNECTION_STRING as string);

export {connection};