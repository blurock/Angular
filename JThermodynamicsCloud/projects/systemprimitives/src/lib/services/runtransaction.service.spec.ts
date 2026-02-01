import { TestBed } from '@angular/core/testing';

import { RuntransactionService } from './runtransaction.service';

describe('RuntransactionService', () => {
  let service: RuntransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuntransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
