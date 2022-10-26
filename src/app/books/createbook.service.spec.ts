import { TestBed } from '@angular/core/testing';

import { CreatebookService } from './createbook.service';

describe('CreatebookService', () => {
  let service: CreatebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
