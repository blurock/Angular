import { TestBed } from '@angular/core/testing';

import { ActivitydataService } from './activitydata.service';

describe('ActivitydataService', () => {
  let service: ActivitydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
