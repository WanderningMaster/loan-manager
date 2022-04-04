import { Schema, model, connect } from 'mongoose';
import bcrypt from "bcrypt";
import { NextFunction } from 'express';

interface User extends Document{
    username: string;
    password: string;
}

const UserScheme = new Schema<User>({
    username: { 
        type: String,
        required: true,
        index: { unique: true } 
    },
    password: { 
        type: String, 
        required: true 
    }
});

UserScheme.pre("save", async function (next: NextFunction) {
    const thisObj = this as User;
    const HASH_ROUNDS = 10;

    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(HASH_ROUNDS);
        thisObj.password = await bcrypt.hash(thisObj.password, salt);
        return next();
    } catch (e) {
        return next(e);
    }
});

const UserModel = model<User>('User', UserScheme);

export { UserModel, User };

