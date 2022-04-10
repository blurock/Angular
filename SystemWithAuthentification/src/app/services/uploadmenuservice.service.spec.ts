import { TestBed } from '@angular/core/testing';

import { UploadmenuserviceService } from './uploadmenuservice.service';

describe('UploadmenuserviceService', () => {
  let service: UploadmenuserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadmenuserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
