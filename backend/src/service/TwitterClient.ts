import {injectable} from 'inversify';
import config from '../../app.properties.json';
import Twit from 'twitter-lite';


@injectable()
export class TwitterClient {
  private twit: Twit;
  constructor() {
    console.log(JSON.stringify(config));
    this.init(config);
  }

  public postMessage = async (message: string) => {
    return await this.twit.post('statuses/update', {status: message});
}

  private init = (c) =>  {
    this.twit = new Twit(c);
  }

}
