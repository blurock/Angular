import { TestBed } from '@angular/core/testing';

import { AgentHITL } from './agent-hitl';

describe('AgentHITL', () => {
  let service: AgentHITL;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentHITL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
