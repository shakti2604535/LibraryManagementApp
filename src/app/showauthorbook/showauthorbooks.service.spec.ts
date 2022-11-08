import { TestBed } from '@angular/core/testing';

import { ShowauthorbooksService } from './showauthorbooks.service';

describe('ShowauthorbooksService', () => {
  let service: ShowauthorbooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowauthorbooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
