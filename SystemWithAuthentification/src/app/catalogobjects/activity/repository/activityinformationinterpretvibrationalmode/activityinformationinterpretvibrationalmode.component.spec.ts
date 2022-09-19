import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretvibrationalmodeComponent } from './activityinformationinterpretvibrationalmode.component';

describe('ActivityinformationinterpretvibrationalmodeComponent', () => {
  let component: ActivityinformationinterpretvibrationalmodeComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretvibrationalmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationinterpretvibrationalmodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationinterpretvibrationalmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
