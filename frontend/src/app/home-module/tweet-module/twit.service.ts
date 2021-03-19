import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {delay, map, mergeMap, retryWhen, take} from 'rxjs/operators';
import * as dayjs from 'dayjs';


export interface ITweetCommand {
    message: string;
    date: number;
}

export interface IScheduledTweet {
    message: string;
    registeredAt: string;
    toBeSentAt: string;
}

export interface ISentTweet {
    message: string;
    sentAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class TwitService {

    public static BASE_URL = 'http://localhost:3001';

    constructor(private http: HttpClient) {
    }

    saveTweet(tweet: ITweetCommand): Observable<Object> {
       return this.http.post(`${TwitService.BASE_URL}/message`, JSON.stringify(tweet), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    refreshScheduledTweets(): Observable<IScheduledTweet[]> {
        return timer(0, 3000).pipe(mergeMap(x => {
            return this.http.get<any[]>(`${TwitService.BASE_URL}/message/scheduled`)
                .pipe( map(savedData => {
                    return savedData.map((value: {message, registeredAt, toBeSentAt}) => {
                        return {
                            message: value.message,
                            registeredAt: dayjs(value.registeredAt).toString(),
                            toBeSentAt: dayjs(value.toBeSentAt).toString()
                        } as IScheduledTweet;
                    });
                }));
        }), retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

    refreshSentTweets(): Observable<ISentTweet[]> {
        return timer(0, 3000).pipe(mergeMap(x => {
            return this.http.get<any[]>(`${TwitService.BASE_URL}/message/sent`).pipe(map(savedData => {
                return savedData.map((value: {message, sentAt}) => {
                    return {
                        message: value.message,
                        sentAt: dayjs(value.sentAt).toString()
                    } as ISentTweet;
                });
            }));
        }), retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

    getScheduledTweets(): Observable<IScheduledTweet[]> {
        return this.http.get<any[]>(`${TwitService.BASE_URL}/message/scheduled`)
            .pipe( map(savedData => {
                return savedData.map((value: {message, registeredAt, toBeSentAt}) => {
                    return {
                        message: value.message,
                        registeredAt: dayjs(value.registeredAt).toString(),
                        toBeSentAt: dayjs(value.toBeSentAt).toString()
                    } as IScheduledTweet;
                });
            }))
            .pipe(retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

}
