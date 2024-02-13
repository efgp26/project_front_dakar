import { TestBed } from '@angular/core/testing';

import { CreateTypeService } from './create-type.service';

describe('CreateTypeService', () => {
  let service: CreateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
