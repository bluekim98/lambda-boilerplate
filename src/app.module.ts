import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

const envFilePath = `config/.env${
    process.env.stage && process.env.stage !== 'local' ? '' : `.local`
}`;

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            envFilePath: envFilePath,
            isGlobal: true,
        }),
        UserModule,
    ],
})
export class AppModule {}
