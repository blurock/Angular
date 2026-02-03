import { TestBed } from '@angular/core/testing';

import { CrossrefService } from './crossref.service';

describe('CrossrefService', () => {
  let service: CrossrefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossrefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
