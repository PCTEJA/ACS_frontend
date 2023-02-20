import { TestBed } from '@angular/core/testing';

import { AAuthGuard } from './aauth.guard';

describe('AAuthGuard', () => {
  let guard: AAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
