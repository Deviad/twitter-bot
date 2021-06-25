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
        // forRoot este o functie cu care furnizam o configuratie, in cadrul unui modul care
        // va fi folosit in toata aplicatia.
        // Deci, aici cream un singleton cu o configurare anume.
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
    /*
        The set of schemas that declare elements to be allowed in the NgModule.
        Elements and properties that are neither Angular components nor directives must be declared in a schema.
        Allowed value are NO_ERRORS_SCHEMA and CUSTOM_ELEMENTS_SCHEMA.
     */
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
