import { TestBed } from '@angular/core/testing';

import { TwitService } from 'src/app/shared/twit.service';

describe('TwitService', () => {
  let service: TwitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
