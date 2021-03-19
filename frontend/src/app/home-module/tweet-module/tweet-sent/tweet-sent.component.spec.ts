import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetSentComponent } from './tweet-sent.component';

describe('TweetScheduleComponent', () => {
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
