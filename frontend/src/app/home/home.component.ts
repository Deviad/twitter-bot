import {Component, OnInit} from '@angular/core';
import {ITweet, TwitService} from '@src/app/twit.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    tweetForm: FormGroup;
    tweets: ITweet[] = [];

    constructor(private ts: TwitService, private fb: FormBuilder) {
        this.tweetForm = fb.group({
            'message':  ['', Validators.compose([this.validateMessage])],
            'scheduledDate': [null, Validators.compose([])],
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

    onSubmit(value: any): void {
        console.log('you submitted value:', value);
    }
}
