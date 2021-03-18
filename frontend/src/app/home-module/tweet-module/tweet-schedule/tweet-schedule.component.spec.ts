import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetScheduleComponent } from './tweet-schedule.component';

describe('TweetScheduleComponent', () => {
  let component: TweetScheduleComponent;
  let fixture: ComponentFixture<TweetScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
