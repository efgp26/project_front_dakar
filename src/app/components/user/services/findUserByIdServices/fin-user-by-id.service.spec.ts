import { TestBed } from '@angular/core/testing';

import { FinUserByIdService } from './fin-user-by-id.service';

describe('FinUserByIdService', () => {
  let service: FinUserByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinUserByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
