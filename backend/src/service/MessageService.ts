// @ts-nocheck
import {inject, injectable} from 'inversify';
import TAGS from '../constant/tags';
import {ScheduledMessageRepository} from '../repository/ScheduledMessageRepository';
import {SentMessageRepository} from '../repository/SentMessageRepository';

import express from 'express';
import {MessageServiceScheduleHandler} from './MessageServiceScheduleHandler';
import {TokenVerifier} from './TokenVerifier';

@injectable()
export class MessageService {

    constructor(@inject(TAGS.MessageServiceScheduleHandler) private messageHandler: MessageServiceScheduleHandler,
                @inject(TAGS.ScheduledMessageRepository) private scMsgRepository: ScheduledMessageRepository,
                @inject(TAGS.SentMessageRepository) private sentMsgRepository: SentMessageRepository,
                @inject(TAGS.TokenVerifier) private tokenVerifier: TokenVerifier
    ) {
    }

    public getScheduledMessages = ({
                                       filter,
                                       pageable
                                   }: {
        filter?: Record<string, any>,
        pageable?: { skip?: number, limit?: number, key?: string, order?: 1 | -1 }
    }, token: string) => {
        return this.tokenVerifier.isVerified(token)
            .then(() => this.scMsgRepository.find(filter, pageable))
            .catch(error => {
                throw error;
            });
    }

    public getSentMessages = ({
                                  filter,
                                  pageable
                              }: {
        filter?: Record<string, any>, pageable?:
            { skip?: number, limit?: number, key?: string, order?: 1 | -1 }
    }, token: string) => {

        return this.tokenVerifier.isVerified(token)
            .then(() => this.sentMsgRepository.find(filter, pageable))
            .catch(error => {
                throw error;
            });
    }


    public sendMessage = async ({
                                    message,
                                    response,
                                    date
                                }: { message: string, response: express.Response, date?: number }, token: string) => {

        try {
            await this.tokenVerifier.isVerified(token);
            await this.messageHandler.handleMessageProcessing({message, response, date});
        } catch (error) {
            throw error;
        }

    }
}
