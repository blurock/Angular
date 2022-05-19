import { TestBed } from '@angular/core/testing';

import { MenutreeserviceService } from './menutreeservice.service';

describe('MenutreeserviceService', () => {
  let service: MenutreeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenutreeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
