import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as dayjs from 'dayjs';
import {concatMap} from 'rxjs/operators';
import {TwitService} from '@src/app/shared/twit.service';
import {TweetStoreService} from '@src/app/home-module/tweet-mobile-module/tweet-store.service';
import {getEnvironmentVars} from '@src/utils';
import {MobileAuthService} from '@src/app/mobile-auth-service';
import toObject from 'dayjs/plugin/toObject';
import duration from 'dayjs/plugin/duration';
import { Dialogs } from '@nativescript/core';

dayjs.extend(toObject);
dayjs.extend(duration);

@Component({
    selector: 'app-tweet-dispatcher',
    templateUrl: './tweet-dispatcher.component.tns.html',
    styleUrls: ['./tweet-dispatcher.component.tns.css']
})
export class TweetDispatcherComponent implements OnInit {
    tweetForm: FormGroup;

    constructor(private ts: TwitService,
                private store: TweetStoreService,
                public auth: MobileAuthService,
                private fb: FormBuilder) {
        console.log('environment is: ', getEnvironmentVars('environment'));
        this.tweetForm = fb.group({
            'message': ['', Validators.compose([this.validateMessage])],
            'scheduledDate': [null, Validators.required],
        });
    }

    /*
        ngOnChanges()
        Răspunde atunci când Angular setează sau resetează proprietățile de intrare legate de date.
        Este apelat inainte de ngOnInit()

        ngOnInit()
        Inițializează directiva sau componenta

        https://angular.io/guide/lifecycle-hooks
  */

    ngOnInit(): void {

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

    onSubmit({message, scheduledDate: date}: { message: string, scheduledDate: string }, token: string): void {
        console.log('you submitted value:', {message, date});

        // Way 2 to handle input validation

        // if (this.tweetForm.pristine ) {
        //     Dialogs.alert('Please fill the form first');
        //     return;
        // }
        //
        // if (!this.tweetForm.pristine && this.tweetForm.invalid) {
        //     Dialogs.alert('Please fill the form properly');
        //     return;
        // }

        this.ts
            .saveTweet({message, date: dayjs(date).valueOf()}, token)
            .pipe(concatMap(() => this.ts.getScheduledTweets('')))
            .subscribe(tweets => {
                    this.store.setState((prevState) => ({...prevState, scheduledTweets: tweets}));
                    console.log(tweets);
                },
                error => {
                    console.log(error);
                });
    }

}
