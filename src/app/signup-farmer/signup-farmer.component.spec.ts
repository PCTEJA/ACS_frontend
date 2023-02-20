import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFarmerComponent } from './signup-farmer.component';

describe('SignupFarmerComponent', () => {
  let component: SignupFarmerComponent;
  let fixture: ComponentFixture<SignupFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFarmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
