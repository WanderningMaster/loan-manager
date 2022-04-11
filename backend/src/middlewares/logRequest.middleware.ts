import { RequestHandler, Request, Response, NextFunction} from 'express';
import { logger } from '../services/logger/logger.service';

const logRequest: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.on("finish", () => {
        logger.info(`METHOD: ${req.method}, PATH:${req.path}, STATUS: ${res.statusCode}`);
    });  
    
    return next();
};

export { logRequest };