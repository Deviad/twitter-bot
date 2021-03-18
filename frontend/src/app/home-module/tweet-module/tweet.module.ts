import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TweetScheduleComponent} from '@src/app/home-module/tweet-module/tweet-schedule/tweet-schedule.component';
import {TweetTabComponent} from './tweet-tab/tweet-tab.component';
import {TabViewModule} from 'primeng/tabview';
import {SharedModule} from '@src/app/shared.module';



@NgModule({
    declarations: [
        TweetTabComponent,
        TweetScheduleComponent,
    ],
    imports: [
        CommonModule,
        InputTextareaModule,
        CalendarModule,
        ButtonModule,
        TabViewModule,
        SharedModule
    ],
    bootstrap: [TweetTabComponent],
    exports: [TweetTabComponent, CommonModule]
})
export class TweetModule {
}
