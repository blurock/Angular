import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityrepositoryinitialreadlocalfileComponent } from './activityrepositoryinitialreadlocalfile.component';

describe('ActivityrepositoryinitialreadlocalfileComponent', () => {
  let component: ActivityrepositoryinitialreadlocalfileComponent;
  let fixture: ComponentFixture<ActivityrepositoryinitialreadlocalfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityrepositoryinitialreadlocalfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityrepositoryinitialreadlocalfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
