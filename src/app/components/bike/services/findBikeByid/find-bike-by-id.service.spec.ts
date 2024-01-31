import { TestBed } from '@angular/core/testing';

import { FindBikeByIdService } from './find-bike-by-id.service';

describe('FindBikeByIdService', () => {
  let service: FindBikeByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindBikeByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
