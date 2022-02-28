import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigenciasC3Component } from './vigencias-c3.component';

describe('VigenciasC3Component', () => {
  let component: VigenciasC3Component;
  let fixture: ComponentFixture<VigenciasC3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigenciasC3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigenciasC3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
