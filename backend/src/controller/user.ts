import * as express from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response} from 'inversify-express-utils';
import {inject} from 'inversify';
import {User} from '../models/user';
import {UserService} from '../service/user';
import TYPES from '../constant/types';

@controller('/user')
export class UserController {

  constructor( @inject(TYPES.UserService) private userService: UserService) { }

  @httpGet('/')
  public async getUsers(@request() req: express.Request, @response() res: express.Response): Promise<User[]> {
    try {
      return await this.userService.find();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  @httpGet('/:id')
  public async getUser(@request() req: express.Request, @response() res: express.Response): Promise<User> {
    try {
      return await this.userService.findOneById(req.params.id);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
    }

  @httpPost('/')
  public async newUser(@request() req: express.Request, @response() res: express.Response): Promise<User> {
    try {
      return await this.userService.insert(req.body);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
    }

  @httpPut('/:id')
  public async updateUser(@request() req: express.Request, @response() res: express.Response): Promise<User> {
    try {
      return await this.userService.update(req.params.id, req.body);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  @httpDelete('/:id')
  public async deleteUser(@request() req: express.Request, @response() res: express.Response): Promise<any> {
    try {
      return await this.userService.remove(req.params.id);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
