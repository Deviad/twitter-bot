import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IScheduledTweet, TwitService} from '@src/app/home-module/tweet-module/twit.service';
import * as dayjs from 'dayjs';
import {concatMap, tap} from 'rxjs/operators';
import {SocialAuthService} from 'angularx-social-login';

@Component({
    selector: 'app-tweet-schedule',
    templateUrl: './tweet-schedule.component.html',
    styleUrls: ['./tweet-schedule.component.css']
})
export class TweetScheduleComponent implements OnInit {

    tweetForm: FormGroup;
    tweets: IScheduledTweet[] = [];
    idToken: string;

    constructor(private ts: TwitService, private fb: FormBuilder, private authService: SocialAuthService) {
        this.tweetForm = fb.group({
            'message': ['', Validators.compose([this.validateMessage])],
            'scheduledDate': [null, Validators.required],
        });
    }

    validateMessage(c: FormControl) {
        const MESSAGE_REGEX = new RegExp('.{3,}');

        console.log('TEST', MESSAGE_REGEX.test(c.value));

        return MESSAGE_REGEX.test(c.value) ? null : {
            validateMessage: {
                valid: false
            }
        };
    }

    ngOnInit() {
        this.authService.authState.pipe(tap(auth => {
           if (auth && auth.idToken) {
               console.log('AUTH IS: ', auth);
               this.idToken = auth.idToken;
               this.refresh(auth.idToken);
           }
        })).subscribe();
    }

    refresh(token: string) {
        this.ts.refreshScheduledTweets(token).subscribe(
            tweets => {
                this.tweets = tweets;
                console.log(this.tweets);
            },
            error => {
                console.log(error);
            }
        );
    }

    onSubmit({message, scheduledDate: date}: { message: string, scheduledDate: string }, token: string): void {
        console.log('you submitted value:', {message, date});
        this.ts
            .saveTweet({message, date: dayjs(date).valueOf()}, token)
            .pipe(concatMap(() => this.ts.getScheduledTweets(this.idToken)))
            .subscribe(  tweets => {
                    this.tweets = tweets;
                    console.log(this.tweets);
                },
                error => {
                    console.log(error);
                });
    }
}
