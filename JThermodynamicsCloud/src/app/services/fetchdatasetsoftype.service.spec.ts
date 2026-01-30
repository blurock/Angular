import { TestBed } from '@angular/core/testing';

import { FetchdatasetsoftypeService } from './fetchdatasetsoftype.service';

describe('FetchdatasetsoftypeService', () => {
  let service: FetchdatasetsoftypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchdatasetsoftypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
