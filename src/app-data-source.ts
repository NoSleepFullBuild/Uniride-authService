import { DataSource } from "typeorm"
import 'reflect-metadata';
import { Auth } from "@nosleepfullbuild/uniride-library/dist/entity/auth/auth.entity";
import { Token } from "@nosleepfullbuild/uniride-library/dist/entity/token/token.entity";

export const AppDataSource = new DataSource({
    host: 'localhost',
    port: 5433,
    username: 'user',
    password: 'password',
    database: 'postgresAuth',
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [Auth, Token],
    // migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

  