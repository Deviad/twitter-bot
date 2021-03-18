import * as express from 'express';
import {controller, httpGet, httpPost, request, response} from 'inversify-express-utils';
import {inject} from 'inversify';
import TAGS from '../constant/tags';
import {MessageService} from '../service/MessageService';
import {ISendMessageCommand} from '../ui/command/SendMessageCommand';
import { IScheduledMessage } from '../eventstore/scheduledMessage';
import {ISentMessage} from "../eventstore/sentMessage";

@controller('/message')
export class MessageController {

  constructor( @inject(TAGS.MessageService) private messageService: MessageService) { }

  @httpGet('/scheduled')
  public async getScheduled(@request() req: express.Request, @response() res: express.Response): Promise<IScheduledMessage[]> {
    try {
      return await this.messageService.getScheduledMessages({});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  @httpGet('/sent')
  public async getSent(@request() req: express.Request, @response() res: express.Response): Promise<ISentMessage[]> {
    try {
      return await this.messageService.getSentMessages({});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // @httpGet('/:id')
  // public async getUser(@request() req: express.Request, @response() res: express.Response): Promise<User> {
  //   try {
  //     return await this.userService.findOneById(req.params.id);
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }

  @httpPost('/')
  public async postMessage(@request() req: express.Request, @response() res: express.Response): Promise<any> {
    try {
      const body: ISendMessageCommand = req.body;
      await this.messageService.sendMessage({message: body.message, response: res, date: ''});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }

  // @httpPut('/:id')
  // public async updateUser(@request() req: express.Request, @response() res: express.Response): Promise<User> {
  //   try {
  //     return await this.userService.update(req.params.id, req.body);
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }

  // @httpDelete('/:id')
  // public async deleteUser(@request() req: express.Request, @response() res: express.Response): Promise<any> {
  //   try {
  //     return await this.userService.remove(req.params.id);
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }
}
