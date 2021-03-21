import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetScheduledComponent } from 'src/app/home-module/tweet-mobile-module/tweet-scheduled/tweet-scheduled.component.tns';

describe('TweetScheduledComponent', () => {
  let component: TweetScheduledComponent;
  let fixture: ComponentFixture<TweetScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetScheduledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
