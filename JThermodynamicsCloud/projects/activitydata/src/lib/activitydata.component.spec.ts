import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitydataComponent } from './activitydata.component';

describe('ActivitydataComponent', () => {
  let component: ActivitydataComponent;
  let fixture: ComponentFixture<ActivitydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitydataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
