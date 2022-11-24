import { TestBed } from '@angular/core/testing';

import { UserinterfaceconstantsService } from './userinterfaceconstants.service';

describe('UserinterfaceconstantsService', () => {
  let service: UserinterfaceconstantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinterfaceconstantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
