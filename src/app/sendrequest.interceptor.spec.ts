import { TestBed } from '@angular/core/testing';

import { SendrequestInterceptor } from './sendrequest.interceptor';

describe('SendrequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SendrequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SendrequestInterceptor = TestBed.inject(SendrequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
