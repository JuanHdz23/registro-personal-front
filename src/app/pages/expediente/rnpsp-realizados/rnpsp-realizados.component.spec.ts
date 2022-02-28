import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnpspRealizadosComponent } from './rnpsp-realizados.component';

describe('RnpspRealizadosComponent', () => {
  let component: RnpspRealizadosComponent;
  let fixture: ComponentFixture<RnpspRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnpspRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnpspRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
