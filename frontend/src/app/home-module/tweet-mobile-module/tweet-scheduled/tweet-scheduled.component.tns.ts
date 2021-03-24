import {Component, OnInit} from '@angular/core';
import {TwitService} from '@src/app/shared/twit.service';
import {TweetStoreService} from '@src/app/home-module/tweet-mobile-module/tweet-store.service';
import {MobileAuthService} from "@src/app/mobile-auth-service";

@Component({
    selector: 'app-tweet-scheduled',
    templateUrl: './tweet-scheduled.component.tns.html',
    styleUrls: ['./tweet-scheduled.component.tns.css']
})
export class TweetScheduledComponent implements OnInit {
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
