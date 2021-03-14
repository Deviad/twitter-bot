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
      const newDate = dayjs().add(10, 's');

      const saveScheduledMessage = () => {
        return this.scMsgRepository.insert({
          message: message,
          registeredAt: dayjs().toDate().getUTCMilliseconds(),
          toBeSentAt: newDate.toDate().getUTCMilliseconds(),
        });
      };
      const sendMessageToTwitter = (sm: ScheduledMessage) => {
        return schedule.scheduleJob(newDate.toDate(), () => {
          this.tc.postMessage(sm.message)
            .then(() => {
              return this.sentMsgRepository.insert({
                _id: sm._id,
                message,
                sentAt: dayjs().toDate().getUTCMilliseconds()
              });
            })
            .then((savedSentMessage) => {
              return this.scMsgRepository.remove(savedSentMessage._id);
            })
            .catch(error => console.log(error.message));
        });
      };
      // promise.all([saveScheduledMessage(), sendMessageToTwitter()])
      //   .catch(error => {
      //     console.log(error);
      //   });
      saveScheduledMessage()
        .then((result) => {
          console.log('hello!');
          return Promise.all([result, sendMessageToTwitter(result)]);

        })
      ;


    } catch (error) {
      return error;
    }
  }

}
