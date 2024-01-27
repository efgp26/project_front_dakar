import { TestBed } from '@angular/core/testing';

import { CreateBikeService } from './create-bike.service';

describe('CreateBikeService', () => {
  let service: CreateBikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
