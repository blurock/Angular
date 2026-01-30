import { TestBed } from '@angular/core/testing';

import { SystemprimitivesService } from './systemprimitives.service';

describe('SystemprimitivesService', () => {
  let service: SystemprimitivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemprimitivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
