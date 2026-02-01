import { TestBed } from '@angular/core/testing';

import { OntologycatalogService } from './ontologycatalog.service';

describe('OntologycatalogService', () => {
  let service: OntologycatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntologycatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
