import { DataSource } from "typeorm"
import 'reflect-metadata';
import { Auth } from "@nosleepfullbuild/uniride-library/dist/entity/auth/auth.entity";
import { Token } from "@nosleepfullbuild/uniride-library/dist/entity/token/token.entity";

// read .env
require('dotenv').config();

export const AppDataSource = new DataSource({
    host: "91.68.22.198",
    port: 5443,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [Auth, Token],
    // migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

  