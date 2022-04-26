import { ApiError } from "../../common/exceptions/Api.error";
import { UserModel, User} from "../../data/models/User/User.model";
import { HttpCode } from "../../common/enums/http/http-code.enum";

import { tokenService } from "../token/token.service";
import { Token } from "../../data/models/Token/Token.model";

import bcrypt from "bcrypt";
import { JWTPair } from "src/common/interfaces/jwt/JWTPair.interface";

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
        tokenService.saveToken({userId: _id.toString(), refreshToken} as Token);

        return jwtPair;
    }
}

export const authService = new AuthService();