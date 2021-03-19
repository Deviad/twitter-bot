import {Component, OnInit} from '@angular/core';
import {ITweetCommand, TwitService} from '@src/app/home-module/tweet-module/twit.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    constructor() {
    }
}
