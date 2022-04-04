import { UserModel, User} from "../../data/models/User/User.model";


class UserService {
    async registration(username: string, password: string): Promise<User> {
        const isUserCreated = await UserModel.findOne({
            username
        });
        if(isUserCreated){
            throw new Error("user is already exists");
        };

        const user = await UserModel.create({
            username, 
            password
        });

        return user;
    } 
}

export const userService = new UserService();