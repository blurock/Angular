import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicssymmetrystructuredefinitionComponent } from './jthermodynamicssymmetrystructuredefinition.component';

describe('JthermodynamicssymmetrystructuredefinitionComponent', () => {
  let component: JthermodynamicssymmetrystructuredefinitionComponent;
  let fixture: ComponentFixture<JthermodynamicssymmetrystructuredefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicssymmetrystructuredefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicssymmetrystructuredefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
