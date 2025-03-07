import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationdatasetcollectionsetcreationComponent } from './activityinformationdatasetcollectionsetcreation.component';

describe('ActivityinformationdatasetcollectionsetcreationComponent', () => {
  let component: ActivityinformationdatasetcollectionsetcreationComponent;
  let fixture: ComponentFixture<ActivityinformationdatasetcollectionsetcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationdatasetcollectionsetcreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationdatasetcollectionsetcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
