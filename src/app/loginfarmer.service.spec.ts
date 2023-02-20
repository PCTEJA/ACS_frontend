import { TestBed } from '@angular/core/testing';

import { LoginfarmerService } from './loginfarmer.service';

describe('LoginfarmerService', () => {
  let service: LoginfarmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginfarmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
