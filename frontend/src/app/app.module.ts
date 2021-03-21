import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from '@src/app/app-routing.module';
import {AppComponent} from '@src/app/app.component';
import {HomeModule} from '@src/app/home-module/home.module';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        SocialLoginModule
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(
                        '686240574976-agfqp80ju764cauhpuonqhnrn6emh4ho.apps.googleusercontent.com', {
                            scope: 'profile email'
                        }
                    )
                },
            ]
        } as SocialAuthServiceConfig,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
