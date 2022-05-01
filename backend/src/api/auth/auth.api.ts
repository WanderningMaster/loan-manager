import { Request, Response, NextFunction} from "express";
import { HttpCode } from "../../common/enums/http/http-code.enum";
import { authService } from "../../services/auth/auth.service";
import { userService } from "../../services/user/user.service";

import "dotenv/config";

class AuthApi {
    async reg(_req: Request, res: Response, next: NextFunction){
        try{
            const {username, password} = _req.body;
            const user = await userService.registration(username, password);
            res
                .status(HttpCode.OK)
                .json({user});
        }
        catch(err: any){
            next(err);
        }
    }
    async login(_req: Request, res: Response, next: NextFunction){
        try{
            const {username, password} = _req.body;
            const {accessToken, refreshToken} = await authService.login(username, password);
            res
                .status(HttpCode.OK)
                .cookie('refreshToken',refreshToken, { maxAge: 15*24*60*60*1000, httpOnly: true })
                .json({accessToken});
        }
        catch(err: any){
            next(err);
        }
    }
    async logout(_req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = _req.cookies;
            await authService.logout(refreshToken);
            res
                .status(HttpCode.OK)
                .clearCookie("refreshToken")
                .end();
        }
        catch(err: any){
            next(err);
        }
    }
    async refresh(_req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = _req.cookies;
            const jwtPair = await authService.refresh(refreshToken);
            res
                .status(HttpCode.OK)
                .cookie('refreshToken',jwtPair.refreshToken, { maxAge: 15*24*60*60*1000, httpOnly: true })
                .json({accessToken: jwtPair.accessToken});
        }
        catch(err: any){
            next(err);
        }
    }
}

export const authApi = new AuthApi();