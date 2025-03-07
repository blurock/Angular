import { TestBed } from '@angular/core/testing';

import { SessiondatamanagementService } from './sessiondatamanagement.service';

describe('SessiondatamanagementService', () => {
  let service: SessiondatamanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessiondatamanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
