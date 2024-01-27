import { TestBed } from '@angular/core/testing';

import { AllListService } from './all-list.service';

describe('AllListService', () => {
  let service: AllListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
