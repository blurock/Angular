import { TestBed } from '@angular/core/testing';

import { AgentGeneric } from './agent-generic';

describe('AgentGeneric', () => {
  let service: AgentGeneric;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentGeneric);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
