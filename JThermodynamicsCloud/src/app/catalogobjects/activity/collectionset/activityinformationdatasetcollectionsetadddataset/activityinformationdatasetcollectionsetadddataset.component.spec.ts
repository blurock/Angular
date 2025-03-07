import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationdatasetcollectionsetadddatasetComponent } from './activityinformationdatasetcollectionsetadddataset.component';

describe('ActivityinformationdatasetcollectionsetadddatasetComponent', () => {
  let component: ActivityinformationdatasetcollectionsetadddatasetComponent;
  let fixture: ComponentFixture<ActivityinformationdatasetcollectionsetadddatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationdatasetcollectionsetadddatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationdatasetcollectionsetadddatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
