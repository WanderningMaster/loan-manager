import { Types } from "mongoose";

export interface JWTPayload{
    _id: Types.ObjectId;
    username: string;
}