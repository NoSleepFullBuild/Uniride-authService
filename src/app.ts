import * as express from "express"
import { AppDataSource } from "./app-data-source"
import { AuthController } from "./controllers/auth.controller";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.json())

const authController = new AuthController();

app.post('/login', authController.login.bind(authController));
app.post('/register', authController.register.bind(authController));

app.listen(3000,() => {
    console.log("Auth service is running on port 3000")
})