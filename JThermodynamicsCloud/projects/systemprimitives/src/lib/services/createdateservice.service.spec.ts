import { TestBed } from '@angular/core/testing';

import { CreatedateserviceService } from './createdateservice.service';

describe('CreatedateserviceService', () => {
  let service: CreatedateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatedateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
