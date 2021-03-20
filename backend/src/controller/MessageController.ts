import * as express from 'express';
import {controller, httpGet, httpPost, request, response} from 'inversify-express-utils';
import {inject} from 'inversify';
import TAGS from '../constant/tags';
import {MessageService} from '../service/MessageService';
import {ISendMessageCommand} from '../ui/command/SendMessageCommand';
import { IScheduledMessage } from '../eventstore/scheduledMessage';
import {ISentMessage} from '../eventstore/sentMessage';
import {hasText} from '../utils';

@controller('/message')
export class MessageController {

  constructor( @inject(TAGS.MessageService) private messageService: MessageService) { }

  @httpGet('/scheduled')
  public async getScheduled(@request() req: express.Request, @response() res: express.Response): Promise<IScheduledMessage[]> {
    try {
      return await this.messageService.getScheduledMessages({pageable: {order: -1, key: 'registeredAt'}});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  @httpGet('/sent')
  public async getSent(@request() req: express.Request, @response() res: express.Response): Promise<ISentMessage[]> {
    try {
      return await this.messageService.getSentMessages({pageable: {order: -1, key: 'sentAt'}});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  @httpPost('/')
  public async postMessage(@request() req: express.Request, @response() res: express.Response): Promise<any> {
    try {
      const body: ISendMessageCommand = req.body;
      const MESSAGE_REGEX = new RegExp('.{3,}');


      if (!hasText(req.body.message) || !MESSAGE_REGEX.test(req.body.message)) {
        throw new Error('the message provided is not valid');
      }

      if (isNaN(req.body?.date)) {
        throw new Error('Date should be time in milliseconds');
      }

      await this.messageService.sendMessage({message: body.message, response: res, date: body.date});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
}
