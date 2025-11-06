import { TestBed } from '@angular/core/testing';

import { DeletetransactionService } from './deletetransaction.service';

describe('DeletetransactionService', () => {
  let service: DeletetransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletetransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
