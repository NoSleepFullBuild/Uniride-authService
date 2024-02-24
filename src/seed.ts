import { AppDataSource } from "./app-data-source";
import { Auth } from "@nosleepfullbuild/uniride-library/dist/entity/auth/auth.entity";

async function createDefaultAuth() {
    try {
        const authRepo = AppDataSource.getRepository(Auth);
        const defaultAuth = await authRepo.findOneBy({ username: "seed" });

        console.log(defaultAuth)

        if (!defaultAuth) {
            const newAuth = authRepo.create({
                id: 1,
                email: "seed@user.com",
                username: "seed",
                password: "seed",
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: "system",
                updatedBy: "system",
            });

            await authRepo.save(newAuth);
            console.log("Default auth has been created!");
        }
        
    } catch (error) {
        console.error("Error creating default auth:", error);
    }
}

export default createDefaultAuth;
