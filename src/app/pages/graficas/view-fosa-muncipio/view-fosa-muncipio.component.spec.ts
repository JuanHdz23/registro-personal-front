import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFosaMuncipioComponent } from './view-fosa-muncipio.component';

describe('ViewFosaMuncipioComponent', () => {
  let component: ViewFosaMuncipioComponent;
  let fixture: ComponentFixture<ViewFosaMuncipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFosaMuncipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFosaMuncipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
