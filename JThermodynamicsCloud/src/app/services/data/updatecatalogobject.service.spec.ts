import { TestBed } from '@angular/core/testing';

import { UpdatecatalogobjectService } from './updatecatalogobject.service';

describe('UpdatecatalogobjectService', () => {
  let service: UpdatecatalogobjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatecatalogobjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
