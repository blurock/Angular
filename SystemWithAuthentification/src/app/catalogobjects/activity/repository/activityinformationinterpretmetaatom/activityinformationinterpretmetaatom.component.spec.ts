import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretmetaatomComponent } from './activityinformationinterpretmetaatom.component';

describe('ActivityinformationinterpretmetaatomComponent', () => {
  let component: ActivityinformationinterpretmetaatomComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretmetaatomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationinterpretmetaatomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationinterpretmetaatomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
