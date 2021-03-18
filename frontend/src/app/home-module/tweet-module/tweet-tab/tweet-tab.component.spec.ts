import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetTabComponent } from './tweet-tab.component';

describe('TweetTabComponent', () => {
  let component: TweetTabComponent;
  let fixture: ComponentFixture<TweetTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
