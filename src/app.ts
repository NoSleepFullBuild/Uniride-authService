import * as express from "express"
import { AppDataSource } from "./app-data-source"
import { AuthController } from "./controllers/auth.controller";
import { checkJwt } from "./middleware/utils";
import createDefaultAuth from "./seed";

AppDataSource
    .initialize()
    .then(async () => {
        await createDefaultAuth();
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.json())

const authController = new AuthController();

app.post('/api/auth/login', authController.login.bind(authController));
app.post('/api/auth/register', authController.register.bind(authController));
app.get('/api/auth/verify-token', authController.verifyToken.bind(authController));
app.post('/api/auth/logout', checkJwt, authController.logout.bind(authController));
app.get('/api/auth/whoiam', authController.whoIam.bind(authController));

app.listen(3000,() => {
    console.log("Auth service is running on port 3000")
})