import { Inject, Injectable } from '@nestjs/common';
import { User } from '@src/database/entity';
import { BaseSqlService } from '@src/database/service/base-sql.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService extends BaseSqlService<User> {
    constructor(
        @Inject('ASYNC_CONNECTION')
        public db: DataSource,
    ) {
        super(User, db);
    }
}
