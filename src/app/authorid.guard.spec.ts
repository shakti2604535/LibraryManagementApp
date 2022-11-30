import { TestBed } from '@angular/core/testing';

import { AuthoridGuard } from './authorid.guard';

describe('AuthoridGuard', () => {
  let guard: AuthoridGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthoridGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
