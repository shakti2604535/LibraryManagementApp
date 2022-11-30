import { TestBed } from '@angular/core/testing';

import { PersonidGuard } from './personid.guard';

describe('PersonidGuard', () => {
  let guard: PersonidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
