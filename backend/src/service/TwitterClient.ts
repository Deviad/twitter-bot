import {injectable} from 'inversify';
import config from '../../app.properties.json';
import Twit from 'twitter-lite';


@injectable()
export class TwitterClient {
  private twit: Twit;
  constructor() {
    // @ts-ignore
    this.init(config.twitter);
  }

  public postMessage = async (message: string) => {
    return await this.twit.post('statuses/update', {status: message});
}

  private init = (c) =>  {
    this.twit = new Twit(c);
  }

}
