import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDealerComponent } from './signup-dealer.component';

describe('SignupDealerComponent', () => {
  let component: SignupDealerComponent;
  let fixture: ComponentFixture<SignupDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
