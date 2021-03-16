// @ts-nocheck
import {inject, injectable} from 'inversify';
import {TwitterClient} from './TwitterClient';
import schedule from 'node-schedule';
import dayjs from 'dayjs';
import TAGS from '../constant/tags';
import {ScheduledMessageRepository} from '../repository/ScheduledMessageRepository';
import {ScheduledMessage} from '../eventstore/scheduledMessage';
import {SentMessageRepository} from '../repository/SentMessageRepository';

import express from 'express';

@injectable()
export class MessageService {

  constructor(@inject(TAGS.TwitterClient) private tc: TwitterClient,
              @inject(TAGS.ScheduledMessageRepository) private scMsgRepository: ScheduledMessageRepository,
              @inject(TAGS.SentMessageRepository) private sentMsgRepository: SentMessageRepository) {
  }


  public getScheduledMessages = ({
                                   filter,
                                   pageable
                                 }: { filter?: Record<string, any>, pageable?: { skip?: number, limit?: number } }) => {
    return this.scMsgRepository.find(filter, pageable);
  }

  public getSentMessages = ({
                              filter,
                              pageable
                            }: { filter?: Record<string, any>, pageable?: { skip?: number, limit?: number } }) => {
    return this.sentMsgRepository.find(filter, pageable);
  }

  public scheduleMessage = async ({
                              message,
                              response,
                              date
                            }: { message: string, response: express.Response, date?: string }) => {

    // todo: use date coming from gui
    try {
      const newDate = dayjs(Date.now()).add(5, 's');

      const saveScheduledMessage = (r: express.Response) => {
        console.log('headers sent 1', r.headersSent);
        return this.scMsgRepository.insert({
          message: message,
          registeredAt: Date.now(),
          toBeSentAt: Date.now() + 5000,
        })
          .then(result =>  {
            console.log('headers sent 2', r.headersSent);
            return Promise.all([result, {res: r}]);
          })
          .catch(error => {
            throw error;
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
          .catch(error => {
            throw error;
          });
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


      return await saveScheduledMessage(response)
        .then(([mess, {res}]) => {
          console.log('headers sent 3', response.headersSent);
          res.json({message: 'message scheduled'});
          return sendMessageToTwitter(mess);
        })
        .catch(error => {
          throw error;
        });

    } catch (error) {
      // console.log(error);
    }
  }
}
