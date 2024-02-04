import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../app-data-source';
import { Token } from '../entities/user/token.entity';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) throw new Error("No token provided.");

        const isBlacklisted = await AppDataSource.getRepository(Token).findOneBy({ token });
        if (isBlacklisted) throw new Error("Token is invalidated.");

        jwt.verify(token, 'secret');
        next();
    } catch (error) {
        res.status(401).send("Unauthorized: Invalid token");
    }
};
