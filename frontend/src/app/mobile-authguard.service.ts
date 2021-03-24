import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {MobileAuthService} from '@src/app/mobile-auth-service';
import {RouterExtensions} from '@nativescript/angular';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: MobileAuthService,  private routerExtensions: RouterExtensions) { }

    canActivate() {
        if (this.auth.getAuthState().isLogged) {
            console.log('PROVA1');

            return true;
        } else {
            console.log('PROVA2');
            this.routerExtensions.navigate(['/login'], {clearHistory: true});
            return false;
        }
    }
}
