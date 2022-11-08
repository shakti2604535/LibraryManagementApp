import { TestBed } from '@angular/core/testing';

import { UnsavechangeGuard } from './unsavechange.guard';

describe('UnsavechangeGuard', () => {
  let guard: UnsavechangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavechangeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
