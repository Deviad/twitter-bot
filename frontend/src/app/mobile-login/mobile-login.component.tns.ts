import {Component, OnInit} from '@angular/core';
import {MobileAuthService} from '@src/app/mobile-auth-service';

@Component({
    selector: 'app-mobile-login',
    templateUrl: './mobile-login.component.tns.html',
    styleUrls: ['./mobile-login.component.css']
})
export class MobileLoginComponent implements OnInit {

    constructor(private auth: MobileAuthService) {
    }

    ngOnInit(): void {
    }

    public onTapLogin() {
        this.auth.login();
    }
}
