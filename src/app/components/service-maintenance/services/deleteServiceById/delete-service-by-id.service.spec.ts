import { TestBed } from '@angular/core/testing';

import { DeleteServiceByIdService } from './delete-service-by-id.service';

describe('DeleteServiceByIdService', () => {
  let service: DeleteServiceByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteServiceByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
