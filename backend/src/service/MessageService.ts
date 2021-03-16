// @ts-nocheck
import {inject, injectable} from 'inversify';
import TAGS from '../constant/tags';
import {ScheduledMessageRepository} from '../repository/ScheduledMessageRepository';
import {SentMessageRepository} from '../repository/SentMessageRepository';

import express from 'express';
import {MessageServiceScheduleHandler} from './MessageServiceScheduleHandler';

@injectable()
export class MessageService {

  constructor(@inject(TAGS.MessageServiceScheduleHandler) private messageHandler: MessageServiceScheduleHandler,
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


  public sendMessage = async ({
                                message,
                                response,
                                date
                              }: { message: string, response: express.Response, date?: string }) => {

    try {
      await this.messageHandler.handleMessageProcessing({message, response, date});
    } catch (error) {
      throw error;
    }

  }
}
