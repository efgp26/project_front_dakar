import { TestBed } from '@angular/core/testing';

import { ListAllMaintenanceService } from './list-all-maintenance.service';

describe('ListAllMaintenanceService', () => {
  let service: ListAllMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAllMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
