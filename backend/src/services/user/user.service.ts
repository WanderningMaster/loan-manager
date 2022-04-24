import { ApiError } from "../../common/exceptions/Api.error";
import { UserModel, User} from "../../data/models/User/User.model";
import { HttpCode } from "../../common/enums/http/http-code.enum";

class UserService {
    async registration(username: string, password: string): Promise<User> {
        const isUserCreated = await UserModel.findOne({
            username
        });
        if(isUserCreated){
            throw new ApiError("User is already exists", HttpCode.BAD_REQUEST);
        };

        const user = await UserModel.create({
            username, 
            password
        });

        return user;
    }
    async getAllUsers(): Promise<User[]>{
        const users = await UserModel.find({});

        return users;
    }
    async getUser(username: string): Promise<User>{
        const user = await UserModel.findOne({
            username
        });
        if(!user){
            throw new ApiError("User not found", HttpCode.BAD_REQUEST);
        }

        return user;
    }
    async getUserById(id: string): Promise<User>{
        const user = await UserModel.findById(
            id
        );
        if(!user){
            throw new ApiError("User not found", HttpCode.BAD_REQUEST);
        }
        return user;
    }
    // async login(username: string, password: string): Promise<User>{
    //     const storedUser = await UserModel.findOne({username});
    //     if(!storedUser){
    //         throw new Error("User not found");
    //     }
    //     const hashedPassword = storedUser.password;
        
    //     const match = await bcrypt.compare(password, hashedPassword);
    //     if(!match){
    //         throw new Error("Invalid username or password");
    //     }
    //     return storedUser;
    //     //create token pair
    // }

}

export const userService = new UserService();