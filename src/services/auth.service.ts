import {AppDataSource} from "../app-data-source"
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { Token } from "@nosleepfullbuild/uniride-library/dist/entity/token/token.entity";
import { Auth } from "@nosleepfullbuild/uniride-library/dist/entity/auth/auth.entity";

export class AuthService {

    async login(email : string, password : string) {
        const user = await AppDataSource
            .getRepository(Auth)
            .findOneBy({email});
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password is incorrect');
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 'secret', {expiresIn: '1h'});
        return {message: 'Auth successful', token};
    }

    async register(email : string, username : string, password : string) {
        
        const userExist = await AppDataSource
            .getRepository(Auth)
            .findOneBy({email});
        if (userExist) {
            throw new Error('Auth already exist');
        }

        const userdata = {
            email: email,
            username: username,
            createdBy: "admin",
            updatedBy: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        console.log(userdata)

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await AppDataSource
            .getRepository(Auth)
            .save({
                ...userdata,
                password: hashedPassword
            });
        return user;
    }

    async logout(token: string) {

        try {
            const decoded: any = jwt.verify(token, 'secret');

            const invalidToken = new Token();
            invalidToken.token = token;
            invalidToken.expiration = decoded.exp;
            await AppDataSource.getRepository(Token).save(invalidToken);

            return true;

        } catch (error) {
            throw new Error('Failed to logout.');
        }
    }

    async whoAmI(token: string) {

        try {

            const isBlacklisted = await AppDataSource.getRepository(Token).findOneBy({ token });
            if (isBlacklisted) {
                throw new Error('Token is invalidated.');
            }
    
            const decoded: any = jwt.verify(token, 'secret');
            const user = await AppDataSource.getRepository(Auth).findOneBy({ id: decoded.id });
            
            return { authId: user.id, email: user.email, username: user.username };

        } catch (error) {
            console.log(error)
            throw new Error('Failed to authenticate token.');
        }
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const isBlacklisted = await AppDataSource.getRepository(Token).findOneBy({ token });
            if (isBlacklisted) {
                throw new Error('Token is invalidated.');
            }
    
            const decoded: any = jwt.verify(token, 'secret');
            const user = await AppDataSource.getRepository(Auth).findOneBy({ id: decoded.id });
            if (!user) {
                throw new Error('User not found');
            }
            
        return { id: user.id, email: user.email, username: user.username };
        
        } catch (error) {
            throw new Error('Failed to verify token.');
        }
    }
    

}