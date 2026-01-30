import { TestBed } from '@angular/core/testing';

import { SystemconstantsService } from './systemconstants.service';

describe('SystemconstantsService', () => {
  let service: SystemconstantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemconstantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
