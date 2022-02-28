import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoAniosComponent } from './rango-anios.component';

describe('RangoAniosComponent', () => {
  let component: RangoAniosComponent;
  let fixture: ComponentFixture<RangoAniosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangoAniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangoAniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
