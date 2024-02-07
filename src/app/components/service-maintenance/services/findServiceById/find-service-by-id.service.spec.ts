import { TestBed } from '@angular/core/testing';

import { FindServiceByIdService } from './find-service-by-id.service';

describe('FindServiceByIdService', () => {
  let service: FindServiceByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindServiceByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
