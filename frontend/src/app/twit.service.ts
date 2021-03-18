import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {concat, Observable, throwError, timer} from 'rxjs';
import {delay, mergeMap, retry, retryWhen, take} from 'rxjs/operators';


export interface ITweet {
    message: string;
    date: number;
}

@Injectable({
    providedIn: 'root'
})
export class TwitService {

    public static BASE_URL = 'http://localhost:3001';

    constructor(private http: HttpClient) {
    }

    saveTweet(tweet: ITweet): void {
        this.http.post(`${TwitService.BASE_URL}/message`, tweet);
    }

    refreshScheduledTweets(): Observable<ITweet[]> {
        return timer(0, 3000).pipe(mergeMap(x => {
            return this.http.get<ITweet[]>(`${TwitService.BASE_URL}/message/scheduled`);
        }), retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

    refreshSentTweets(): Observable<ITweet[]> {
        return timer(0, 3000).pipe(mergeMap(x => {
            return this.http.get<ITweet[]>(`${TwitService.BASE_URL}/message/sent`);
        }), retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

    getTweets(): Observable<ITweet[]> {
        return this.http.get<ITweet[]>(`${TwitService.BASE_URL}/message/scheduled`);
    }

}
