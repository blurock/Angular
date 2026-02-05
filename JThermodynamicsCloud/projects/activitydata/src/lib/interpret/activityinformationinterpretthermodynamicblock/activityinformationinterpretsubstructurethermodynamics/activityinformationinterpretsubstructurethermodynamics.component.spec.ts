import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretsubstructurethermodynamicsComponent } from './activityinformationinterpretsubstructurethermodynamics.component';

describe('ActivityinformationinterpretsubstructurethermodynamicsComponent', () => {
  let component: ActivityinformationinterpretsubstructurethermodynamicsComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretsubstructurethermodynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityinformationinterpretsubstructurethermodynamicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityinformationinterpretsubstructurethermodynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
