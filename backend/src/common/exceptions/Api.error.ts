import { HttpCode } from "src/common/enums/http/http-code.enum";

class ApiError extends Error{
    public status: HttpCode;
    public message: string;

    constructor(message: string, status: HttpCode){
        super(message);

        this.status = status;
    }
}

export {ApiError};