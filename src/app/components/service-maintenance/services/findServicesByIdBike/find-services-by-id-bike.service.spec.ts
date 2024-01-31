import { TestBed } from '@angular/core/testing';

import { FindServicesByIdBikeService } from './find-services-by-id-bike.service';

describe('FindServicesByIdBikeService', () => {
  let service: FindServicesByIdBikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindServicesByIdBikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
