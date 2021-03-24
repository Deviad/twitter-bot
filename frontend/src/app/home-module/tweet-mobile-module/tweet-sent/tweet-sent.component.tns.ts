import { Component, OnInit } from '@angular/core';
import {TwitService} from '@src/app/shared/twit.service';
import {TweetStoreService} from '@src/app/home-module/tweet-mobile-module/tweet-store.service';
import {MobileAuthService} from '@src/app/mobile-auth-service';

@Component({
  selector: 'app-tweet-sent',
  templateUrl: './tweet-sent.component.tns.html',
  styleUrls: ['./tweet-sent.component.tns.css']
})
export class TweetSentComponent implements OnInit {

  constructor(private ts: TwitService, private store: TweetStoreService, private authService: MobileAuthService) {
  }

  ngOnInit() {
    // this.authService.authState.pipe(tap(auth => {
    //     if (auth && auth.idToken) {
    //         console.log('AUTH IS: ', auth);
    //         this.idToken = auth.idToken;
    //         this.refresh(auth.idToken);
    //     }
    // })).subscribe();
    this.refresh(this.authService.getAuthState().idToken);
  }

  getSentTweets() {
    return this.store.getState().sentTweets;
  }

  refresh(token: string) {
    this.ts.refreshSentTweets(token).subscribe(
        tweets => {
            this.store.setState((prevState) => ({...prevState, sentTweets: tweets}));
          console.log('sent tweets', this.store.getState().sentTweets);
        },
        error => {
          console.log(JSON.stringify(error));
        }
    );
  }

}
