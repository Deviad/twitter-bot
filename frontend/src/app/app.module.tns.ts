import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular';

import {AppRoutingModule} from '@src/app/app-routing.module.tns';
import {AppComponent} from '@src/app/app.component.tns';
import {HomeModule} from '@src/app/home-module/home.module.tns';
import {TNSFontIconModule, TNSFontIconService, USE_STORE} from 'nativescript-ngx-fonticon';
import {MobileAuthService} from '@src/app/mobile-auth-service';
import {MobileLoginComponent} from '@src/app/mobile-login/mobile-login.component';
import {AuthGuard} from '@src/app/mobile-authguard.service';

TNSFontIconService.debug = true;

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
    declarations: [
        AppComponent,
        MobileLoginComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HomeModule,
        NativeScriptHttpClientModule,
        TNSFontIconModule.forRoot({})

    ],
    providers: [MobileAuthService, TNSFontIconService,
        {
            provide: USE_STORE,
            useValue: {
                'fa': require('../assets/fontawesome.css').default,
                'ion': require('../assets/ionicons.css').default
            }
        },
        [AuthGuard],
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
