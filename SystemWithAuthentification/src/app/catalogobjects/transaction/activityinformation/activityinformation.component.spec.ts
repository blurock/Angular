import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationComponent } from './activityinformation.component';

describe('ActivityinformationComponent', () => {
  let component: ActivityinformationComponent;
  let fixture: ComponentFixture<ActivityinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
