import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

export class CronContainer {
    private static moduleRef: TestingModule;
    static async init() {
        if (!this.moduleRef) {
            const moduleRef = await Test.createTestingModule({
                imports: [AppModule],
            }).compile();
            this.moduleRef = moduleRef;
        }
        return this;
    }
    static getService<T>(target: string) {
        return this.moduleRef.get<T>(target);
    }
}
