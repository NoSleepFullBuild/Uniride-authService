import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const response = await this.authService.login(email, password);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async register(req: Request, res: Response) {
        try {
            const { email, username, password } = req.body;
            const user = await this.authService.register(email, username, password);
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            if (error.message === 'User already exist') {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
    

}
