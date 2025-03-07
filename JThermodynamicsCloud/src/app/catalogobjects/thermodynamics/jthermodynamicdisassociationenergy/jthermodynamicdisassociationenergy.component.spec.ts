import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicdisassociationenergyComponent } from './jthermodynamicdisassociationenergy.component';

describe('JthermodynamicdisassociationenergyComponent', () => {
  let component: JthermodynamicdisassociationenergyComponent;
  let fixture: ComponentFixture<JthermodynamicdisassociationenergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicdisassociationenergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicdisassociationenergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
