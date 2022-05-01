import { Request, Response, NextFunction} from "express";
import { HttpCode } from "../../common/enums/http/http-code.enum";
import { userService } from "../../services/user/user.service";

class UserApi {
    async getAllUsers(_req: Request, res: Response, next: NextFunction){
        try {
            const users = await userService.getAllUsers();
            res
                .status(HttpCode.OK)
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
                .status(HttpCode.OK)
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
                .status(HttpCode.OK)
                .json({user});
        } catch(error: any){
            next(error);
        }
    }
    async deleteUserById(_req: Request, res: Response, next: NextFunction){
        try {
            const { id } = _req.params;
            const deletedUser = await userService.removeById(id);

            res
                .status(HttpCode.OK)
                .json({deletedUser});
        }
        catch(error: any){
            next(error);
        }
    }
}

export const userApi = new UserApi();