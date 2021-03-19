import express from 'express';
import {inject, injectable} from 'inversify';
import TAGS from '../constant/tags';
import {TwitterClient} from './TwitterClient';
import {ScheduledMessageRepository} from '../repository/ScheduledMessageRepository';
import {SentMessageRepository} from '../repository/SentMessageRepository';
import {ScheduledMessage} from '../eventstore/scheduledMessage';
import schedule from 'node-schedule';

@injectable()
export class MessageServiceScheduleHandler {
  constructor(@inject(TAGS.TwitterClient) private tc: TwitterClient,
              @inject(TAGS.ScheduledMessageRepository) private scMsgRepository: ScheduledMessageRepository,
              @inject(TAGS.SentMessageRepository) private sentMsgRepository: SentMessageRepository) {
  }



  public handleMessageProcessing = async ({
                                    message,
                                    response,
                                    date
                                  }: { message: string, response: express.Response, date?: number }) => {

    // todo: use date coming from gui
    try {
      return await this.saveScheduledMessage(response, message, date)
        .then(([mess, {res}]) => {
          console.log('headers sent 3', response.headersSent);
          res.json({message: 'message scheduled'});
          return this.sendMessageToTwitter(mess, date);
        })
        .catch(error => {
          throw error;
        });

    } catch (error) {
      throw error;
    }
  }


  public handleMessageDeliveryPhase = (sm: ScheduledMessage) => {
    return this.tc.postMessage(sm.message)
      .then(() => this.sentMsgRepository.insert({
          _id: sm._id,
          message: sm.message,
          sentAt: Date.now()
        }))
      .then((savedSentMessage) => {
        return this.scMsgRepository.remove(savedSentMessage._id);
      })
      .catch(error => {
        throw error;
      });
  }

   public saveScheduledMessage = (r: express.Response, message: string, date: number) => {
    console.log('headers sent 1', r.headersSent);
    return this.scMsgRepository.insert({
      message: message,
      registeredAt: Date.now(),
      toBeSentAt: date,
    })
      .then(result =>  {
        console.log('headers sent 2', r.headersSent);
        return Promise.all([result, {res: r}]);
      })
      .catch(error => {
        throw error;
      });
  }

  public sendMessageToTwitter = (sm: ScheduledMessage, date) => new Promise((resolve, reject) => {
    const newDate = new Date(date);
    schedule.scheduleJob(newDate, () => {
      try {
        resolve(this.handleMessageDeliveryPhase(sm));
      } catch (error) {
        reject(error);
      }
    });
  })

}
