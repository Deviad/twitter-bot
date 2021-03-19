import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IScheduledTweet, ISentTweet, TwitService} from '@src/app/home-module/tweet-module/twit.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-tweet-sent',
  templateUrl: './tweet-sent.component.html',
  styleUrls: ['./tweet-sent.component.css']
})
export class TweetSentComponent implements OnInit {

    tweets: ISentTweet[] = [];

    constructor(private ts: TwitService) {
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
}
