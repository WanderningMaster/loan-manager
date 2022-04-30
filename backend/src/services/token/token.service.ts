import { ApiError } from "../../common/exceptions/Api.error";
import { TokenModel, Token} from "../../data/models/Token/Token.model";
import { HttpCode } from "../../common/enums/http/http-code.enum";
import { JWTPayload } from "../../common/interfaces/jwt/JwtPayload.interface";
import { JWTPair } from "../../common/interfaces/jwt/JWTPair.interface";
import jwt from "jsonwebtoken";

import "dotenv/config";
import { logger } from "../logger/logger.service";

const {
    JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY,
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_EXPIRATION,
} = process.env

class TokenService {
    async saveToken(TokenDto: Token): Promise<void> {
        const {refreshToken, userId} = TokenDto;
        const createdToken = await this.getTokenByUserId(userId);
        if(createdToken){
            await TokenModel.updateOne({
                    userId
                },{
                    refreshToken
                }
            )
            return;
        }
        await TokenModel.create({
            refreshToken,
            userId
        });
    }
    async isTokenStored(refreshToken: string): Promise<Boolean>{
        const token = await TokenModel.findOne({
            refreshToken
        });
        if(!token){
            throw new ApiError("Token not found", HttpCode.BAD_REQUEST);
        }

        return true;
    }
    async getTokenByUserId(userId: string): Promise<Token>{
        const token = await TokenModel.findOne({
            userId
        });
    
        return token;
    }
    async removeById(id: string): Promise<void>{
        const deletedToken = await TokenModel.findByIdAndDelete(
            id
        );
        if(!deletedToken){
            throw new ApiError("Token not found", HttpCode.BAD_REQUEST);
        }
    }
    async removeToken(refreshToken: string): Promise<void>{
        const deletedToken = await TokenModel.deleteOne({
            refreshToken
        });
        if(!deletedToken){
            throw new ApiError("Token not found", HttpCode.BAD_REQUEST);
        }
    }
    async generateTokens(payload: JWTPayload): Promise<JWTPair>{
        const refreshToken = jwt.sign(payload, <string>JWT_REFRESH_SECRET_KEY, {
            expiresIn: '15d'
        });

        const accessToken = jwt.sign(payload, <string>JWT_ACCESS_SECRET_KEY, {
            expiresIn: '15m'
        });
        return {
            accessToken,
            refreshToken
        };
    }
    async validateAccessToken(token: string): Promise<JWTPayload | undefined>{
        try {
            const userData = jwt.verify(token, <string>JWT_ACCESS_SECRET_KEY) as JWTPayload;
            return userData;
        } catch (error: any) {
            logger.error(error.message);
            return undefined;
        }
    }
    async validateRefreshToken(token: string): Promise<JWTPayload | undefined>{
        try {
            const userData = jwt.verify(token, <string>JWT_REFRESH_SECRET_KEY) as JWTPayload;
            return userData;
        } catch (error: any) {
            logger.error(error.message);
            return undefined;
        }
    }
}

export const tokenService = new TokenService();