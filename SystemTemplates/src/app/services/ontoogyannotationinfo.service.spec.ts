import { TestBed } from '@angular/core/testing';

import { OntoogyannotationinfoService } from './ontoogyannotationinfo.service';

describe('OntoogyannotationinfoService', () => {
  let service: OntoogyannotationinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntoogyannotationinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
