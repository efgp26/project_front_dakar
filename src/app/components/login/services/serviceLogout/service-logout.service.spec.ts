import { TestBed } from '@angular/core/testing';

import { ServiceLogoutService } from './service-logout.service';

describe('ServiceLogoutService', () => {
  let service: ServiceLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
