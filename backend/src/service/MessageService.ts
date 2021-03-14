import {inject, injectable} from 'inversify';
import {TwitterClient} from './TwitterClient';
import schedule from 'node-schedule';
import dayjs from 'dayjs';
import TYPES from '../constant/types';


@injectable()
export class MessageService {

  constructor(@inject(TYPES.TwitterClient) private tc: TwitterClient) {
  }

  public scheduleMessage = async ({message, date}: {message: string, date?: string}) => {

    // todo: use date coming from guy
    try {
      const newDate = dayjs().add(10, 's');
      return await this.promisifiedJob(newDate.toDate(), message, this.tc);

    } catch (error) {
      return error;
    }
  }

  private promisifiedJob = (d: Date, m: string, t: TwitterClient) => new Promise((resolve, reject) => {
    schedule.scheduleJob(d, () => {
      try {
        resolve(t.postMessage(m));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  })
}
