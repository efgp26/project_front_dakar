import { TestBed } from '@angular/core/testing';

import { ListUsserByRolService } from './list-usser-by-rol.service';

describe('ListUsserByRolService', () => {
  let service: ListUsserByRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUsserByRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
