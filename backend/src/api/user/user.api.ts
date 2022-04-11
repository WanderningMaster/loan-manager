import { Request, Response, NextFunction} from "express";
import { logger } from "../../services/logger/logger.service";
import { userService } from "../../services/user/user.service";

class UserApi {
    async reg(_req: Request, res: Response, next: NextFunction){
        try{
            const {username, password} = _req.body;
            const user = await userService.registration(username, password);
            res
                .status(200)
                .json({user});
        }
        catch(err: any){
            next(err);
        }
    }
    // async login(_req: Request, res: Response){
    //     try {
    //         const {username, password} = _req.body;
    //         const user = await userService.login(username, password);
    //         res
    //             .status(200)
    //             .json({user});
    //     } catch (error: any) {
    //         logger.error(error);
    //         res
    //             .status(404)
    //             .json({error: error.message});
    //     }
    // }
    async getAllUsers(_req: Request, res: Response, next: NextFunction){
        try {
            const users = await userService.getAllUsers();
            res
                .status(200)
                .json({users});
        } catch(error: any){
            next(error);
        }
    }
    async getUser(_req: Request, res: Response, next: NextFunction){
        try {
            const { username } = _req.body;
            const user = await userService.getUser(username);

            res
                .status(200)
                .json({user});
        } catch(error: any){
            next(error)
        }
    }
    async getUserById(_req: Request, res: Response, next: NextFunction){
        try {
            const { id } = _req.params;
            const user = await userService.getUserById(id);

            res
                .status(200)
                .json({user});
        } catch(error: any){
            next(error);
        }
    }
}

export const userApi = new UserApi();