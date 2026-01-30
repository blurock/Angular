import { TestBed } from '@angular/core/testing';

import { ScienceAgentService } from './science-agent-service';

describe('ScienceAgentService', () => {
  let service: ScienceAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScienceAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
