import { TestBed } from '@angular/core/testing';

import { SetdynamicchildbaseService } from './setdynamicchildbase.service';

describe('SetdynamicchildbaseService', () => {
  let service: SetdynamicchildbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetdynamicchildbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
