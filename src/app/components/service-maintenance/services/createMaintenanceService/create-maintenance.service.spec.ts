import { TestBed } from '@angular/core/testing';

import { CreateMaintenanceService } from './create-maintenance.service';

describe('CreateMaintenanceService', () => {
  let service: CreateMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
