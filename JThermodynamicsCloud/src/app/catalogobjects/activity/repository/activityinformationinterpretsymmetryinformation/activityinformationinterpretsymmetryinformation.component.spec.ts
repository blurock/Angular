import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretsymmetryinformationComponent } from './activityinformationinterpretsymmetryinformation.component';

describe('ActivityinformationinterpretsymmetryinformationComponent', () => {
  let component: ActivityinformationinterpretsymmetryinformationComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretsymmetryinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationinterpretsymmetryinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationinterpretsymmetryinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
