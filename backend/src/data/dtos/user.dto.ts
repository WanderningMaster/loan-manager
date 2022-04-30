import {User} from "../models/User/User.model";
import { Document, Types } from 'mongoose';

export class UserDto{
    id: string;
    username: string;
    constructor(user: Document<unknown, any, User> & User & {
        _id: Types.ObjectId;
    }){
        this.id = user._id.toString();
        this.username = user.username;
    }
}