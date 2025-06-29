import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretbensonruledataComponent } from './activityinformationinterpretbensonruledata.component';

describe('ActivityinformationinterpretbensonruledataComponent', () => {
  let component: ActivityinformationinterpretbensonruledataComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretbensonruledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityinformationinterpretbensonruledataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityinformationinterpretbensonruledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
