import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component.tns';
import {TweetMobileModule} from '@src/app/home-module/tweet-mobile-module/tweet-mobile.module';
import {NativeScriptCommonModule, NativeScriptModule} from '@nativescript/angular';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TweetMobileModule,
    NativeScriptModule,
    NativeScriptCommonModule
  ],
  bootstrap: [HomeComponent],
  exports: [HomeComponent],
  /*
    The set of schemas that declare elements to be allowed in the NgModule.
    Elements and properties that are neither Angular components nor directives must be declared in a schema.
    Allowed value are NO_ERRORS_SCHEMA and CUSTOM_ELEMENTS_SCHEMA.
 */
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
