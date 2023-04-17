import { TestBed } from '@angular/core/testing';

import { UsercreateGuard } from './usercreate.guard';

describe('UsercreateGuard', () => {
  let guard: UsercreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsercreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
