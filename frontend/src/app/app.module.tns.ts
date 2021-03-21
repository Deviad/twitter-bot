import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from '@nativescript/angular';

import {AppRoutingModule} from '@src/app/app-routing.module.tns';
import {AppComponent} from '@src/app/app.component.tns';
import {HomeModule} from '@src/app/home-module/home.module.tns';
import {TNSFontIconModule, TNSFontIconService, USE_STORE} from 'nativescript-ngx-fonticon';
TNSFontIconService.debug = true;

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    HomeModule,
    TNSFontIconModule.forRoot({})

],
  providers: [TNSFontIconService,
    {
      provide: USE_STORE,
      useValue: {
          'fa': require('../assets/fontawesome.css').default,
          'ion': require('../assets/ionicons.css').default
      }
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
