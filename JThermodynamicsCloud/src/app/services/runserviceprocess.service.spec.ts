import { TestBed } from '@angular/core/testing';

import { RunserviceprocessService } from './runserviceprocess.service';

describe('RunserviceprocessService', () => {
  let service: RunserviceprocessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunserviceprocessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
