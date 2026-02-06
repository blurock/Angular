import { TestBed } from '@angular/core/testing';

import { ViewandlocalfilesavecatalogobjectService } from './viewandlocalfilesavecatalogobject.service';

describe('ViewandlocalfilesavecatalogobjectService', () => {
  let service: ViewandlocalfilesavecatalogobjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewandlocalfilesavecatalogobjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
