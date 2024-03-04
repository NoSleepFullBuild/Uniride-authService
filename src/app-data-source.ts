import { DataSource } from "typeorm";
import 'reflect-metadata';
import { Auth } from "@nosleepfullbuild/uniride-library/dist/entity/auth/auth.entity";
import { Token } from "@nosleepfullbuild/uniride-library/dist/entity/token/token.entity";

// read .env
require('dotenv').config();

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [Auth, Token],
    // migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
