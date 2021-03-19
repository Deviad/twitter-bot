import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IScheduledTweet, TwitService} from '@src/app/home-module/tweet-module/twit.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-tweet-schedule',
  templateUrl: './tweet-schedule.component.html',
  styleUrls: ['./tweet-schedule.component.css']
})
export class TweetScheduleComponent implements OnInit {

    tweetForm: FormGroup;
    tweets: IScheduledTweet[] = [];

    constructor(private ts: TwitService, private fb: FormBuilder) {
        this.tweetForm = fb.group({
            'message':  ['', Validators.compose([this.validateMessage])],
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
        this.refresh();
    }

    refresh() {
        this.ts.refreshScheduledTweets().subscribe(
            tweets => {
                this.tweets = tweets;
                console.log(this.tweets);
            },
            error => {
                console.log(error);
            }
        );
    }

    onSubmit({message, date}: {message: string, date: string}): void {
        console.log('you submitted value:', {message, date});
        this.ts.saveTweet({message, date: dayjs(date).valueOf()});
    }
}
