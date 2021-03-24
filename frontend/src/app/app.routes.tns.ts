import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home-module/home.component.tns';
import {AuthGuard} from '@src/app/mobile-authguard.service';
import {MobileLoginComponent} from '@src/app/mobile-login/mobile-login.component.tns';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: MobileLoginComponent,
    },
];
