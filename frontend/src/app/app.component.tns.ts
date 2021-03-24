import {Component, OnChanges, OnInit} from '@angular/core';
import {MobileAuthService} from '@src/app/mobile-auth-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.tns.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {

    constructor(public auth: MobileAuthService) {
    }

}
