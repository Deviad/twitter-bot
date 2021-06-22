import {Component, OnInit} from '@angular/core';
import {TwitService} from '@src/app/shared/twit.service';
import {TweetStoreService} from '@src/app/home-module/tweet-mobile-module/tweet-store.service';
import {MobileAuthService} from '@src/app/mobile-auth-service';

@Component({
    selector: 'app-tweet-scheduled',
    templateUrl: './tweet-scheduled.component.tns.html',
    styleUrls: ['./tweet-scheduled.component.tns.css']
})
export class TweetScheduledComponent implements OnInit {
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

    getScheduledTweets() {
        return this.store.getState().scheduledTweets;
    }

    refresh(token: string) {
        this.ts.refreshScheduledTweets(token).subscribe(
            tweets => {
                this.store.setState((prevState) => ({...prevState, scheduledTweets: tweets}));
                console.log('tweets', this.store.getState().scheduledTweets);
            },
            error => {
                console.log(error);
            }
        );
    }

}
