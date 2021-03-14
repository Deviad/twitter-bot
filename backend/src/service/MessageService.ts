import {inject, injectable} from 'inversify';
import {TwitterClient} from './TwitterClient';
import schedule from 'node-schedule';
import dayjs from 'dayjs';
import TAGS from '../constant/tags';
import {ScheduledMessageRepository} from '../repository/ScheduledMessageRepository';
import {ScheduledMessage} from '../eventstore/scheduledMessage';
import {SentMessageRepository} from '../repository/SentMessageRepository';


@injectable()
export class MessageService {

  constructor(@inject(TAGS.TwitterClient) private tc: TwitterClient,
              @inject(TAGS.ScheduledMessageRepository) private scMsgRepository: ScheduledMessageRepository,
              @inject(TAGS.SentMessageRepository) private sentMsgRepository: SentMessageRepository) {
  }

  public scheduleMessage = ({message, date}: { message: string, date?: string }) => {

    // todo: use date coming from gui
    try {
      const newDate = dayjs(Date.now()).add(5, 's');

      const saveScheduledMessage = () => {
        return this.scMsgRepository.insert({
          message: message,
          registeredAt: Date.now(),
          toBeSentAt: Date.now() + 5000,
        });
      };


      const handleMessage = (sm: ScheduledMessage) => {
        return this.tc.postMessage(sm.message)
          .then(() => {
            console.log('miseriaccia');
            return this.sentMsgRepository.insert({
              _id: sm._id,
              message,
              sentAt: Date.now()
            });
          })
          .then((savedSentMessage) => {
            return this.scMsgRepository.remove(savedSentMessage._id);
          })
          .catch(error => console.log(error));
      };

      const sendMessageToTwitter = (sm: ScheduledMessage) => new Promise((resolve, reject) => {
        schedule.scheduleJob(newDate.toDate(), () => {
          try {
            resolve(handleMessage(sm));
          } catch (error) {
            reject(error);
          }
        });
      });


      return saveScheduledMessage()
        .then((result) => {
          return sendMessageToTwitter(result);
        })
        .catch(error => {
          console.log('the error is: ', error);
        });

    } catch (error) {
      console.log(error);
    }
  }
}
