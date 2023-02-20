import { TestBed } from '@angular/core/testing';

import { FAuthGuard } from './fauth.guard';

describe('FAuthGuard', () => {
  let guard: FAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
