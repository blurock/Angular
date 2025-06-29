import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationmolecularthermodynamicsComponent } from './activityinformationmolecularthermodynamics.component';

describe('ActivityinformationmolecularthermodynamicsComponent', () => {
  let component: ActivityinformationmolecularthermodynamicsComponent;
  let fixture: ComponentFixture<ActivityinformationmolecularthermodynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityinformationmolecularthermodynamicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityinformationmolecularthermodynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
