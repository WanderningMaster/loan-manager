import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import { NextFunction } from 'express';

interface Token extends Document{
    userId: string;
    refreshToken: string;
}

const TokenScheme = new Schema<Token>({
    userId: {
        type: String,
        required: true
    },
    refreshToken: { 
        type: String,
        required: true,
        index: { unique: true } 
    }
});

const TokenModel = model<Token>('Token', TokenScheme);

export { TokenModel, Token };

