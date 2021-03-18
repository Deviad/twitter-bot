import {Component, OnInit} from '@angular/core';
import {ITweet, TwitService} from '@src/app/home-module/twit.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.tns.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    tweets: ITweet[] = [];

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

    onSubmit(value: any): void {
        console.log('you submitted value:', value);
    }
}
