import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetDispatcherComponent } from 'src/app/home-module/tweet-mobile-module/tweet-dispatcher/tweet-dispatcher.component.tns';

describe('TweetDispatcherComponent', () => {
  let component: TweetDispatcherComponent;
  let fixture: ComponentFixture<TweetDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetDispatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
