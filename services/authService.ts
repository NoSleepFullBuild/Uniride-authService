// services/authService.ts
import { authModel } from '@uniride/library';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class AuthService {

  async register(user: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userModel = new authModel({ email, password: hashedPassword });
    await userModel.save();
    return user;
  }

  async login(email: string, password: string) {
    const user = await authModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    return user;
  }
}
