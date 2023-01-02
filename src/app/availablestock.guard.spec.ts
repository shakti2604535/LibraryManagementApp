import { TestBed } from '@angular/core/testing';

import { AvailablestockGuard } from './availablestock.guard';

describe('AvailablestockGuard', () => {
  let guard: AvailablestockGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AvailablestockGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
