import { TestBed } from '@angular/core/testing';

import { ObservableroutinesService } from './observableroutines.service';

describe('ObservableroutinesService', () => {
  let service: ObservableroutinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservableroutinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
