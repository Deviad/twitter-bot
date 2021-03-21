import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as dayjs from 'dayjs';
import {concatMap} from 'rxjs/operators';
import {TwitService} from '@src/app/shared/twit.service';
import {TweetStoreService} from '@src/app/home-module/tweet-mobile-module/tweet-store.service';
import {getEnvironmentVars} from '@src/utils';

@Component({
    selector: 'app-tweet-dispatcher',
    templateUrl: './tweet-dispatcher.component.tns.html',
    styleUrls: ['./tweet-dispatcher.component.tns.css']
})
export class TweetDispatcherComponent implements OnInit {
    tweetForm: FormGroup;

    constructor(private ts: TwitService, private store: TweetStoreService) {
        console.log('environment is: ', getEnvironmentVars('environment'));

    }

    ngOnInit(): void {

    }

    onSubmit({message, scheduledDate: date}: { message: string, scheduledDate: string }, token: string): void {
        console.log('you submitted value:', {message, date});
        this.ts
            .saveTweet({message, date: dayjs(date).valueOf()}, token)
            .pipe(concatMap(() => this.ts.getScheduledTweets('')))
            .subscribe(tweets => {
                    this.store.setState((prevState) => ({...prevState, scheduledTweets: tweets}));
                    console.log(tweets);
                },
                error => {
                    console.log(error);
                });
    }
}
