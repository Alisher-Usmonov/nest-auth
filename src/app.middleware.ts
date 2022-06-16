import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Req as Request } from "./auth/auth.interface";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
    use(req: Request, res: Response, next: NextFunction) {
        if(req.cookies) {
            let token = req.cookies?.token;
            if(!token) {
                req.user = null;
                next();
                return;
            }
            let user = this.jwtService.verify(token);
            req.user = user._doc;
            next()
        }
    }
}