import {inject, injectable} from 'inversify';
import {TwitterClient} from './TwitterClient';
import schedule from 'node-schedule';
import dayjs from 'dayjs';
import TAGS from '../constant/tags';
import {ScheduledMessageRepository} from '../repository/ScheduledMessageRepository';


@injectable()
export class MessageService {

  constructor(@inject(TAGS.TwitterClient) private tc: TwitterClient,
              @inject(TAGS.ScheduledMessageRepository) private scMsgRepository: ScheduledMessageRepository) {
  }

  public scheduleMessage = ({message, date}: { message: string, date?: string }) => {

    // todo: use date coming from gui
    try {
      const newDate = dayjs().add(10, 's');

      const saveScheduledMessage = () => {
        return this.scMsgRepository.insert({
          message: message,
          registeredAt: dayjs().toDate().getMilliseconds(),
          toBeSentAt: newDate.toDate().getMilliseconds(),
        });
      };
      const sendMessageToTwitter = () => {
        return schedule.scheduleJob(newDate.toDate(), () => {
          this.tc.postMessage(message);
        });
      };
      Promise.all([saveScheduledMessage(), sendMessageToTwitter()]);





    } catch (error) {
      return error;
    }
  }

}
