import { DataSource } from "typeorm"
import 'reflect-metadata';
import { Auth } from "@nosleepfullbuild/uniride-library/dist/entity/auth/auth.entity";
import { Token } from "@nosleepfullbuild/uniride-library/dist/entity/token/token.entity";

// read .env
require('dotenv').config();

export const AppDataSource = new DataSource({
    host: "localhost",
    port: 5443,
    username: "user",
    password: "password",
    database: "postgresAuth",
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [Auth, Token],
    // migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

  