import { TestBed } from '@angular/core/testing';

import { CrossrefserviceService } from './crossrefservice.service';

describe('CrossrefserviceService', () => {
  let service: CrossrefserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossrefserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
