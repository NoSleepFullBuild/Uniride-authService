// controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { user, email, password } = req.body;
            const userModel = await authService.register(user, email, password);
            res.status(201).json(userModel);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
