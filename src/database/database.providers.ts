import { ConfigService } from '@nestjs/config';
import { entities } from '@src/database/entity/index';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'ASYNC_CONNECTION',
        inject: [ConfigService],
        useFactory: async () => {
            const connection = new DataSource(getOption());
            try {
                return await connection.initialize();
            } catch (error) {
                return await connection.initialize();
            }
        },
    },
];

const getOption = (): DataSourceOptions => {
    return {
        multipleStatements: true,
        type: 'mysql',
        replication: {
            master: {
                host: process.env.MASTER_DB_HOST,
                port: Number(process.env.MASTER_DB_PORT),
                username: process.env.MASTER_DB_USER,
                password: process.env.MASTER_DB_PASSWORD,
                database: process.env.DB_NAME,
            },
            slaves: [
                {
                    host: process.env.CHILD_DB_HOST,
                    port: Number(process.env.CHILD_DB_PORT),
                    username: process.env.CHILD_DB_USER,
                    password: process.env.CHILD_DB_PASSWORD,
                    database: process.env.DB_NAME,
                },
            ],
        },
        entities,
        extra: {
            connectionLimit: 10,
        },
        synchronize: false,
        // timezone: 'Z',
        logging: ['query', 'error'],
        // logging:
        //     process.env.stage && process.env.stage !== 'local'
        //         ? ['error']
        //         : ['query', 'error'],
        // namingStrategy: new SnakeNamingStrategy(),
    };
};
