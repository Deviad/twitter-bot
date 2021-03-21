import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {TweetMobileTabComponent} from '@src/app/home-module/tweet-mobile-module/tweet-mobile-tab/tweet-mobile-tab.component';
import {TweetDispatcherComponent} from '@src/app/home-module/tweet-mobile-module/tweet-dispatcher/tweet-dispatcher.component.tns';
import {TweetSentComponent} from '@src/app/home-module/tweet-mobile-module/tweet-sent/tweet-sent.component.tns';
import {TweetScheduledComponent} from '@src/app/home-module/tweet-mobile-module/tweet-scheduled/tweet-scheduled.component.tns';
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule
} from '@nativescript/angular';
import {TNSFontIconModule} from 'nativescript-ngx-fonticon';


@NgModule({
    declarations: [TweetMobileTabComponent, TweetDispatcherComponent, TweetSentComponent, TweetScheduledComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptModule,
        TNSFontIconModule
    ],
    bootstrap: [TweetMobileTabComponent],
    exports: [TweetMobileTabComponent, TweetDispatcherComponent, TweetSentComponent, TweetScheduledComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TweetMobileModule {
}
