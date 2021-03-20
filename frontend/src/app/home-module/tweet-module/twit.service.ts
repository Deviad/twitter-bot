import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {delay, map, mergeMap, retryWhen, take} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);


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

    constructor(private http: HttpClient) {
    }

    public static BASE_URL = 'http://localhost:3001';
    public static FORMAT = 'DD/MM/YYYY hh:mm:ss A';

    saveTweet(tweet: ITweetCommand, token: string): Observable<Object> {
       return this.http.post(`${TwitService.BASE_URL}/message`, JSON.stringify(tweet), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    refreshScheduledTweets(token: string): Observable<IScheduledTweet[]> {
        return timer(0, 3000).pipe(mergeMap(x => {
            return this.http.get<any[]>(`${TwitService.BASE_URL}/message/scheduled`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .pipe( map(savedData => {
                    return savedData.map(({message, registeredAt, toBeSentAt}:
                                              {message: string, registeredAt: number, toBeSentAt: number}) => {
                        return {
                            message: message,
                            registeredAt: dayjs.utc(registeredAt).local().format(TwitService.FORMAT),
                            toBeSentAt: dayjs(toBeSentAt).local().format(TwitService.FORMAT)
                        } as IScheduledTweet;
                    });
                }));
        }), retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

    refreshSentTweets(token: string): Observable<ISentTweet[]> {
        return timer(0, 3000).pipe(mergeMap(x => {
            return this.http.get<any[]>(`${TwitService.BASE_URL}/message/sent`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).pipe(map(savedData => {
                return savedData.map(({message, sentAt}: {message: string, sentAt: number}) => {
                    return {
                        message: message,
                        sentAt: dayjs(sentAt).local().format(TwitService.FORMAT)
                    } as ISentTweet;
                });
            }));
        }), retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

    getScheduledTweets(token: string): Observable<IScheduledTweet[]> {
        return this.http.get<any[]>(`${TwitService.BASE_URL}/message/scheduled`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe( map(savedData => {
                return savedData.map(({message, registeredAt, toBeSentAt}:
                                          {message: string, registeredAt: number, toBeSentAt: number}) => {
                    return {
                        message: message,
                        registeredAt: dayjs(registeredAt).local().format(TwitService.FORMAT),
                        toBeSentAt: dayjs(toBeSentAt).local().format(TwitService.FORMAT)
                    } as IScheduledTweet;
                });
            }))
            .pipe(retryWhen(errors => errors.pipe(delay(3000), take(3))));
    }

}
