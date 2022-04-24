import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpCode } from "../common/enums/http/http-code.enum";
import { ApiError } from "../common/exceptions/Api.error";
import { logger } from "../services/logger/logger.service";

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    logger.error(err);
    if(err instanceof ApiError){
        res
            .status(err.status)
            .send({error: err.message, status: err.status});
    } else {
        res
            .status(HttpCode.INTERNAL_SERVER_ERROR)
            .send({error: "Unexpected error", status: HttpCode.INTERNAL_SERVER_ERROR});
    }  
    
};

export { errorHandler };