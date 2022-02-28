import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasTramiteComponent } from './citas-tramite.component';

describe('CitasTramiteComponent', () => {
  let component: CitasTramiteComponent;
  let fixture: ComponentFixture<CitasTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
