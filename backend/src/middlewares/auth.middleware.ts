import { Request, Response, NextFunction } from "express"
import { JWTPayload } from "../common/interfaces/jwt/JwtPayload.interface";
import { ApiError } from "../common/exceptions/Api.error";
import { tokenService } from "../services/token/token.service";

interface RequestWithUser extends Request{
    user: JWTPayload;
}

export const authMiddleware = async (_req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = _req.headers.authorization;
        if(!authHeader){
            throw new ApiError("Unauthorized error", 401);
        }
        
        const accessToken = authHeader.split(' ')[1];
        if(!accessToken){
            throw new ApiError("Unauthorized error", 401);
        }

        const userData = await tokenService.validateAccessToken(accessToken);
        if(!userData){
            throw new ApiError("Unauthorized error", 401);
        }
        _req.user = userData;
        next();
    } catch (error: any) {
        next(error);
    }
}