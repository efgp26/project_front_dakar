import { TestBed } from '@angular/core/testing';

import { DeleteTypeService } from './delete-type.service';

describe('DeleteTypeService', () => {
  let service: DeleteTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
