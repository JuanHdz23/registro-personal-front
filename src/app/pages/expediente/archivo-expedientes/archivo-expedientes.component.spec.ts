import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoExpedientesComponent } from './archivo-expedientes.component';

describe('ArchivoExpedientesComponent', () => {
  let component: ArchivoExpedientesComponent;
  let fixture: ComponentFixture<ArchivoExpedientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivoExpedientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
