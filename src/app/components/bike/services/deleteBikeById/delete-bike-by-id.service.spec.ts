import { TestBed } from '@angular/core/testing';

import { DeleteBikeByIdService } from './delete-bike-by-id.service';

describe('DeleteBikeByIdService', () => {
  let service: DeleteBikeByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBikeByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
