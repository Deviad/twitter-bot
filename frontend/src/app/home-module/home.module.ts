import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {TweetModule} from '@src/app/home-module/tweet-module/tweet.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TweetModule,

  ],
  bootstrap: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
