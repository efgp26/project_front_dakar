import { TestBed } from '@angular/core/testing';

import { ActivateModalDeleteService } from './activate-modal-delete.service';

describe('ActivateModalDeleteService', () => {
  let service: ActivateModalDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateModalDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
