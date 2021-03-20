import {Component, OnInit} from '@angular/core';
import {ISentTweet, TwitService} from '@src/app/home-module/tweet-module/twit.service';
import {tap} from 'rxjs/operators';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-tweet-sent',
  templateUrl: './tweet-sent.component.html',
  styleUrls: ['./tweet-sent.component.css']
})
export class TweetSentComponent implements OnInit {

    tweets: ISentTweet[] = [];
    idToken: string;

    constructor(private ts: TwitService, private authService: SocialAuthService) {
    }


    ngOnInit() {
        this.authService.authState.pipe(tap(auth => {
            if (auth && auth.idToken) {
                this.idToken = auth.idToken;
                this.refresh(auth.idToken);
            }
        })).subscribe();
    }
    refresh(token: string) {
        this.ts.refreshSentTweets(token).subscribe(
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
