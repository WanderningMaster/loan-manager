import { Request, Response } from "express";
import { logger } from "../../services/logger/logger.service";
import { userService } from "../../services/user/user.service";

class UserApi {
    async reg(_req: Request, res: Response){
        try{
            const {username, password} = _req.body;
            const user = await userService.registration(username, password);
            res
                .status(200)
                .json({user});
        }
        catch(error: any){
            console.log("errorfwefwe");
            logger.error(error);
            res
                .status(404)
                .json({error: error.message});
        }
    }
}

const userApi = new UserApi();
export {userApi};