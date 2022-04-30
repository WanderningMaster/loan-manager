import { ApiError } from "../../common/exceptions/Api.error";
import { UserModel, User} from "../../data/models/User/User.model";
import { HttpCode } from "../../common/enums/http/http-code.enum";
import { UserDto } from "../../data/dtos/user.dto";

class UserService {
    async registration(username: string, password: string): Promise<UserDto> {
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

        const userDto = new UserDto(user);
        return userDto;
    }
    async getAllUsers(): Promise<UserDto[]>{
        const users = await UserModel.find({});

        const userDtos = users.map(user => new UserDto(user));
        return userDtos;
    }
    async getUser(username: string): Promise<UserDto>{
        const user = await UserModel.findOne({
            username
        });
        if(!user){
            throw new ApiError("User not found", HttpCode.BAD_REQUEST);
        }

        const userDto = new UserDto(user);
        return userDto;
    }
    async getUserById(id: string): Promise<UserDto>{
        const user = await UserModel.findById(
            id
        );
        if(!user){
            throw new ApiError("User not found", HttpCode.BAD_REQUEST);
        }

        const userDto = new UserDto(user);
        return userDto;
    }
    async removeById(id: string): Promise<UserDto>{
        const deletedUser = await UserModel.findByIdAndDelete(
            id
        )
        if(!deletedUser){
            throw new ApiError("User not found", HttpCode.BAD_REQUEST);
        }

        const userDto = new UserDto(deletedUser);
        return userDto;
    }
}

export const userService = new UserService();