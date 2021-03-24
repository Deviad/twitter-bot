import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IScheduledTweet, ISentTweet} from '@src/app/shared/twit.service';

export interface TabState {

    scheduledTweets: IScheduledTweet[];
    sentTweets: ISentTweet[];
}

@Injectable()
export class TweetStoreService {
    /*
    *  Un Subject este un Observable special ale cărei valori sunt transmise unei pluralități de observatori
    * in aceasi timp (multicast). Un Observable simplu poate transmite valoarile doar catre un observator.
    *  Am ales un BehaviorSubject pentru ca permite de alege o valoare initiale si pentru ca poate fi folosit in
    * template ca getState().propertiate.
    * */


    tweetStore: BehaviorSubject<Partial<TabState>>;
        constructor() {
        this.tweetStore = new BehaviorSubject({scheduledTweets: [], sentTweets: []});
    }

    setState(cb: (prevState: Partial<TabState>) => Partial<TabState>) {
            this.tweetStore.next(cb(this.tweetStore.getValue()));

    }

    getState() {
       return this.tweetStore.getValue();
    }

}
