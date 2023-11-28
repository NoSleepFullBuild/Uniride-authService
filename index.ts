// index.ts
import express from "express";
import { AuthController } from "./controllers/authController";

const app = express();
const PORT = 4000;
const authController = new AuthController();

app.use(express.json());

app.post("/register", authController.register);
app.post("/login", authController.login);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
