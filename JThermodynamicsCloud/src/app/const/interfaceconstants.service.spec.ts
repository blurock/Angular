import { TestBed } from '@angular/core/testing';

import { InterfaceconstantsService } from './interfaceconstants.service';

describe('InterfaceconstantsService', () => {
  let service: InterfaceconstantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceconstantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
