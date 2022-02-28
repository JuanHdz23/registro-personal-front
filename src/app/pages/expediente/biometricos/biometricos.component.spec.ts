import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricosComponent } from './biometricos.component';

describe('BiometricosComponent', () => {
  let component: BiometricosComponent;
  let fixture: ComponentFixture<BiometricosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometricosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
