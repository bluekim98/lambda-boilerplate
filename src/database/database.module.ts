import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
