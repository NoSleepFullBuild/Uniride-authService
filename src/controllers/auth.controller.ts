import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { Authentification } from '../middleware/authentification';
import { Counter } from 'prom-client';

const loginCounter = new Counter({
  name: 'auth_service_logins_total',
  help: 'Total number of logins',
});

export class AuthController {

    private authService: AuthService;
    private authentification: Authentification;

    constructor() {
        this.authService = new AuthService();
        this.authentification = new Authentification();
    }
    

    async login(req: Request, res: Response) {

        try {

            const { email, password } = req.body;

            if(!email || !password) return res.status(400).json({ error: 'Missing fields' });

            const response = await this.authService.login(email, password);

            loginCounter.inc();

            res.status(200).json(response);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async register(req: Request, res: Response) {

        try {
            const { email, username, password, token } = req.body;
            
            if(!email || !username || !password) return res.status(400).json({ error: 'Missing fields' });

            if(!this.authentification.checkoutEmail(email)) return res.status(400).json({ error: 'Invalid email' });

            if(!this.authentification.checkoutUsername(username)) return res.status(400).json({ error: 'Invalid username, 3 minimum caracters' });

            if(!this.authentification.checkoutPassword(password)) return res.status(400).json({ error: 'Invalid password, 8 minimum caracters' });

            const user = await this.authService.register(email, username, password, token);
            res.status(201).json({ message: 'Auth created', user });

        } catch (error) {
            
            if (error.message === 'Auth already exist') {
                return res.status(409).json({ error: error.message });
            }

            res.status(500).json({ error: error.message });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) throw new Error("No token provided.");
            await this.authService.logout(token);
            res.status(200).json({ message: 'User logged out' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async verifyToken(req: Request, res: Response) {
        try {
          const token = req.headers["authorization"]?.split(" ")[1];
          if (!token) throw new Error("No token provided.");
          const response = await this.authService.verifyToken(token); 
          if (response.error) {
            return res.status(500).json({ error: response.error });
          }
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json({ error: error.message || "An error occurred" });
        }
      }
      

    async whoIam(req: Request, res: Response) {

        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) throw new Error("No token provided.");
            const response = await this.authService.whoAmI(token);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
    
    

}
