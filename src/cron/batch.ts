import { Callback, CloudWatchLogsEvent, Context } from 'aws-lambda';
import { CronContainer } from './cron.container';
import moment from 'moment-timezone';
import { UserService } from '@src/user/user.service';

export async function run(
    event: CloudWatchLogsEvent,
    context: Context,
    callback: Callback,
) {
    try {
        const userService = await CronContainer.init().then((app) =>
            app.getService<UserService>('UserService'),
        );
    } catch (err) {
        const today = moment()
            .utc()
            .add(9, 'hour')
            .format('YYYY-MM-DD HH:mm:ss');
        console.log(`err @(${today})`);
        console.log(err);
    }
}
