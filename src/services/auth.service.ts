import {AppDataSource} from "../app-data-source"
import {User} from '../entities/user/users.entity';

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export class AuthService {

    async login(email : string, password : string) {
        const user = await AppDataSource
            .getRepository(User)
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
            .getRepository(User)
            .findOneBy({email});
        if (userExist) {
            throw new Error('User already exist');
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
            .getRepository(User)
            .save({
                ...userdata,
                password: hashedPassword
            });
        return user;
    }

    async logout() {
        return true;
    }
}