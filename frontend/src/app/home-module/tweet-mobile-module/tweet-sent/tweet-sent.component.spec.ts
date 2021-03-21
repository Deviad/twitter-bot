import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetSentComponent } from 'src/app/home-module/tweet-mobile-module/tweet-sent/tweet-sent.component.tns';

describe('TweetSentComponent', () => {
  let component: TweetSentComponent;
  let fixture: ComponentFixture<TweetSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
