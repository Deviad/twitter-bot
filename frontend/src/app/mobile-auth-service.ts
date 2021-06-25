import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {GoogleLogin, ILoginResult} from 'nativescript-google-login';
import {isIOS} from '@nativescript/core';
import {android, ios} from '@nativescript/core/application';
import {RouterExtensions} from '@nativescript/angular';
import {environment} from '@src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {fromPromise} from 'rxjs/internal-compatibility';
import {concatMap, delay, retryWhen, take, tap} from 'rxjs/operators';


interface IAuthState {
    idToken: string;
    isLogged: boolean;
}

@Injectable()
export class MobileAuthService {
    public static BASE_URL = environment.apiUrl;
    public static FORMAT = 'DD/MM/YYYY hh:mm:ss A';

    private authState: BehaviorSubject<Partial<IAuthState>> =
        new BehaviorSubject({idToken: '', isLogged: false});

    constructor(private routerExtensions: RouterExtensions, private http: HttpClient) {
        this.init();
    }

    setAuthState(cb: (prevState: Partial<IAuthState>) => Partial<IAuthState>) {
        this.authState.next(cb(this.authState.getValue()));
    }

    getAuthState() {
        return this.authState.getValue();
    }

    private init() {
        if (isIOS) {
            GoogleLogin.init({
                google: {
                    initialize: true,
                    serverClientId: '686240574976-agfqp80ju764cauhpuonqhnrn6emh4ho.apps.googleusercontent.com',
                    clientId: '686240574976-tevb4c3finbi2go6op1giip8ffs678qa.apps.googleusercontent.com',
                    isRequestAuthCode: true
                },
                viewController: ios.rootController,
            });

        } else {
            GoogleLogin.init({
                google: {
                    initialize: true,
                    serverClientId: '686240574976-agfqp80ju764cauhpuonqhnrn6emh4ho.apps.googleusercontent.com',
                    clientId: '686240574976-tevb4c3finbi2go6op1giip8ffs678qa.apps.googleusercontent.com',
                    isRequestAuthCode: true
                },
                activity: android.foregroundActivity
            });
        }
    }

    login() {
        const login: Promise<ILoginResult> = new Promise((res, rej) => {
            try {
                GoogleLogin.login(result => {
                    if (result.code !== 0) {
                        rej(JSON.stringify(result));
                    }
                    return res(result);
                });
            } catch (error) {
                rej(error);
            }
        });

        fromPromise(login).pipe(concatMap(res => {
                return this.fetchIdToken(res.authCode);
            }), retryWhen(errors => errors.pipe(delay(3000), take(3), tap(x => console.log(x)),
            concatMap((error, index) => throwError(error)))),
            tap(resp => {
                this.setAuthState(prevState => ({
                    ...prevState, idToken: resp.idToken, isLogged: true
                }));
            }),
            tap(x => {
                    console.log(this.authState.getValue().idToken);
            }),
            concatMap(x => fromPromise(this.routerExtensions.navigate(['/home'], {clearHistory: true}))))
            .subscribe();

    }

    logout(): void {
        GoogleLogin.logout(() => {
            console.log('LOGOUT DONE');
            this.setAuthState(prevState => ({
                ...prevState, idToken: '', isLogged: false
            }));
        });
    }

    fetchIdToken(authCode: string): Observable<{idToken: string}> {
        return this.http.post<{idToken: string}>(`${MobileAuthService.BASE_URL}/auth`, JSON.stringify({authCode}), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }


}
