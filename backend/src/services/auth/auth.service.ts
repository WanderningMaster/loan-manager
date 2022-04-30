import { ApiError } from "../../common/exceptions/Api.error";
import { UserModel } from "../../data/models/User/User.model";
import { HttpCode } from "../../common/enums/http/http-code.enum";

import { tokenService } from "../token/token.service";
import { Token } from "../../data/models/Token/Token.model";

import bcrypt from "bcrypt";
import { JWTPair } from "src/common/interfaces/jwt/JWTPair.interface";
import { userService } from "../user/user.service";

class AuthService {
    async login(username: string, password: string): Promise<JWTPair>{
        const storedUser = await UserModel.findOne({username});
        if(!storedUser){
            throw new ApiError("User not found", HttpCode.BAD_REQUEST);
        }
        const hashedPassword = storedUser.password;
        
        const match = await bcrypt.compare(password, hashedPassword);
        if(!match){
            throw new ApiError("Invalid username or password", HttpCode.BAD_REQUEST);
        }
        const { _id } = storedUser;
        const payload = {_id, username};

        const jwtPair = await tokenService.generateTokens(payload);
        const {refreshToken} = jwtPair;
        await tokenService.saveToken({userId: _id.toString(), refreshToken} as Token);

        return jwtPair;
    }
    async logout(refreshToken: string): Promise<void>{
        if(!refreshToken){
            throw new ApiError("Unauthorized error", HttpCode.UNAUTHORIZED_ERROR);
        }
        await tokenService.removeToken(refreshToken);
    }
    async refresh(token: string): Promise<JWTPair>{
        if(!token){
            throw new ApiError("Unauthorized error", HttpCode.UNAUTHORIZED_ERROR);
        }
        const userData = await tokenService.validateRefreshToken(token);
        const isTokenStored = await tokenService.isTokenStored(token);
        if(!userData || !isTokenStored){
            throw new ApiError("Unauthorized error", HttpCode.UNAUTHORIZED_ERROR);
        }

        const {_id} = userData;
        const user = await userService.getUserById(_id.toString());
        const {username} = user;
        const payload = {_id, username};

        const jwtPair = await tokenService.generateTokens(payload);
        const {refreshToken} = jwtPair;
        await tokenService.saveToken({userId: _id.toString(), refreshToken} as Token);

        return jwtPair;
    }
}

export const authService = new AuthService();