import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityinformationinterpretthermodynamicblockComponent } from './activityinformationinterpretthermodynamicblock.component';

describe('ActivityinformationinterpretthermodynamicblockComponent', () => {
  let component: ActivityinformationinterpretthermodynamicblockComponent;
  let fixture: ComponentFixture<ActivityinformationinterpretthermodynamicblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityinformationinterpretthermodynamicblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityinformationinterpretthermodynamicblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
