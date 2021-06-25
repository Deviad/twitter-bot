import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {TweetMobileTabComponent} from '@src/app/home-module/tweet-mobile-module/tweet-mobile-tab/tweet-mobile-tab.component.tns';
import {TweetDispatcherComponent} from '@src/app/home-module/tweet-mobile-module/tweet-dispatcher/tweet-dispatcher.component.tns';
import {TweetSentComponent} from '@src/app/home-module/tweet-mobile-module/tweet-sent/tweet-sent.component.tns';
import {TweetScheduledComponent} from '@src/app/home-module/tweet-mobile-module/tweet-scheduled/tweet-scheduled.component.tns';
import {NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptModule} from '@nativescript/angular';
import {TNSFontIconModule} from 'nativescript-ngx-fonticon';
import {TwitService} from '@src/app/shared/twit.service';
import {TweetStoreService} from '@src/app/home-module/tweet-mobile-module/tweet-store.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NativeScriptDateTimePickerModule} from '@nativescript/datetimepicker/angular';


@NgModule({
    declarations: [TweetMobileTabComponent, TweetDispatcherComponent, TweetSentComponent, TweetScheduledComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptModule,
        TNSFontIconModule,
        NativeScriptDateTimePickerModule
    ],
    bootstrap: [TweetMobileTabComponent],
    exports: [TweetMobileTabComponent],
    /*
        The set of schemas that declare elements to be allowed in the NgModule.
        Elements and properties that are neither Angular components nor directives must be declared in a schema.
        Allowed value are NO_ERRORS_SCHEMA and CUSTOM_ELEMENTS_SCHEMA.
    */
    schemas: [NO_ERRORS_SCHEMA],
    providers: [TwitService, TweetStoreService]
})
export class TweetMobileModule {
}
