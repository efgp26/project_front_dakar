import { TestBed } from '@angular/core/testing';

import { UpdateBikeService } from './update-bike.service';

describe('UpdateBikeService', () => {
  let service: UpdateBikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
