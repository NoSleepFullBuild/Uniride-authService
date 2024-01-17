import { DataSource } from "typeorm"
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    host: 'localhost',
    port: 5433,
    username: 'user',
    password: 'password',
    database: 'postgresAuth',
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

  