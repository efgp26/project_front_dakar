import { TestBed } from '@angular/core/testing';

import { ListAllBikeService } from './list-all-bike.service';

describe('ListAllBikeService', () => {
  let service: ListAllBikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAllBikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
