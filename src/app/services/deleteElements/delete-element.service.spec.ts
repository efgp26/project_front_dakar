import { TestBed } from '@angular/core/testing';

import { DeleteElementService } from './delete-element.service';

describe('DeleteElementService', () => {
  let service: DeleteElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
