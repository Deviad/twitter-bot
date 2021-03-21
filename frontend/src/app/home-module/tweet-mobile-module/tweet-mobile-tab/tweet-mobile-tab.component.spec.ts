import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetMobileTabComponent } from '@src/app/home-module/tweet-mobile-module/tweet-mobile-tab/tweet-mobile-tab.component';

describe('TweetMobileTabComponent', () => {
  let component: TweetMobileTabComponent;
  let fixture: ComponentFixture<TweetMobileTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetMobileTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetMobileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
