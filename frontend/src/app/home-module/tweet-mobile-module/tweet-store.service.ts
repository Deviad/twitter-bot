import {Injectable} from '@angular/core';
import {BehaviorSubject, scheduled} from 'rxjs';
import {IScheduledTweet, ISentTweet} from '@src/app/shared/twit.service';

export interface TabState {

    scheduledTweets: IScheduledTweet[];
    sentTweets: ISentTweet[];
}

@Injectable()
export class TweetStoreService {

    tweetStore: BehaviorSubject<Partial<TabState>>;
        constructor() {
        this.tweetStore = new BehaviorSubject({scheduledTweets: [], sentTweets: []});
    }

    setState(cb: (prevState: Partial<TabState>) => Partial<TabState>) {
        // return (prevState: Partial<TabState>) =>  this.tweetStore.next({
        //     ...prevState,
        //     ...state,
        // });
            this.tweetStore.next(cb(this.tweetStore.getValue()));

    }

    getState() {
       return this.tweetStore.getValue();
    }

}
