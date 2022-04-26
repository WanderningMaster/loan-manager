import { Request, Response, NextFunction} from "express";
import { HttpCode } from "../../common/enums/http/http-code.enum";
import { authService } from "../../services/auth/auth.service";

import "dotenv/config";

class AuthApi {
    async login(_req: Request, res: Response, next: NextFunction){
        try{
            const {username, password} = _req.body;
            const {accessToken, refreshToken} = await authService.login(username, password);
            res
                .status(HttpCode.OK)
                .cookie('token',accessToken, { maxAge: 900000, httpOnly: true })
                .json({refreshToken});
        }
        catch(err: any){
            next(err);
        }
    }
}

export const authApi = new AuthApi();