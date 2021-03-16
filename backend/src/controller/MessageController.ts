import * as express from 'express';
import {controller, httpPost, request, response} from 'inversify-express-utils';
import {inject} from 'inversify';
import TAGS from '../constant/tags';
import {MessageService} from '../service/MessageService';
import {ISendMessageCommand} from '../ui/command/SendMessageCommand';

@controller('/message')
export class MessageController {

  constructor( @inject(TAGS.MessageService) private messageService: MessageService) { }

  // @httpGet('/')
  // public async getUsers(@request() req: express.Request, @response() res: express.Response): Promise<User[]> {
  //   try {
  //     return await this.userService.find();
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }

  // @httpGet('/:id')
  // public async getUser(@request() req: express.Request, @response() res: express.Response): Promise<User> {
  //   try {
  //     return await this.userService.findOneById(req.params.id);
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }

  @httpPost('/')
  public async postMesage(@request() req: express.Request, @response() res: express.Response): Promise<any> {
    try {
      const body: ISendMessageCommand = req.body;
      await this.messageService.sendMessage({message: body.message, response: res, date: ''});

    } catch (err) {
      if (res.headersSent) {
        throw err;
      } else {
        res.status(500).json({ error: err.message });
      }
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
