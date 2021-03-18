import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITweet, TwitService} from '@src/app/home-module/twit.service';

@Component({
  selector: 'app-tweet-schedule',
  templateUrl: './tweet-schedule.component.html',
  styleUrls: ['./tweet-schedule.component.css']
})
export class TweetScheduleComponent implements OnInit {

    tweetForm: FormGroup;
    tweets: ITweet[] = [];

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
        this.ts.refreshSentTweets().subscribe(
            tweets => {
                this.tweets = tweets;
                console.log(this.tweets);
            },
            error => {
                console.log(error);
            }
        );
    }

    onSubmit(value: any): void {
        console.log('you submitted value:', value);
    }
}
