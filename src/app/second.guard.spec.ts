import { TestBed } from '@angular/core/testing';

import { SecondGuard } from './second.guard';

describe('SecondGuard', () => {
  let guard: SecondGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecondGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
