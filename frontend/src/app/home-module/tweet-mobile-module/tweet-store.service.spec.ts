import { TestBed } from '@angular/core/testing';

import { TweetStoreService } from './tweet-store.service';

describe('TweetStoreService', () => {
  let service: TweetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
