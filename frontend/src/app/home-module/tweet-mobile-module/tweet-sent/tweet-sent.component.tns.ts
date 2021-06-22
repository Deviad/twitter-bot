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

    /*
       ngOnChanges()
       Răspunde atunci când Angular setează sau resetează proprietățile de intrare legate de date.
       Este apelat inainte de ngOnInit()

       ngOnInit()
       Inițializează directiva sau componenta

       https://angular.io/guide/lifecycle-hooks
    */

  ngOnInit() {
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
