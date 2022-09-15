import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretdisassociationenergyComponent } from './activityinformationinterpretdisassociationenergy.component';

describe('ActivityinformationinterpretdisassociationenergyComponent', () => {
  let component: ActivityinformationinterpretdisassociationenergyComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretdisassociationenergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationinterpretdisassociationenergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationinterpretdisassociationenergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
