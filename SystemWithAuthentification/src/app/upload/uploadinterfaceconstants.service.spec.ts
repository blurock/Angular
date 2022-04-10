import { TestBed } from '@angular/core/testing';

import { UploadinterfaceconstantsService } from './uploadinterfaceconstants.service';

describe('UploadinterfaceconstantsService', () => {
  let service: UploadinterfaceconstantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadinterfaceconstantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
