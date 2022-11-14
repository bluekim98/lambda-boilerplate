import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: Handler;
async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );
        nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));
        nestApp.enableCors();
        await nestApp.init();
        cachedServer = serverlessExpress({ app: expressApp });
    }
    return cachedServer;
}
export const index: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    cachedServer = cachedServer ?? (await bootstrap());
    return cachedServer(event, context, callback);
};
