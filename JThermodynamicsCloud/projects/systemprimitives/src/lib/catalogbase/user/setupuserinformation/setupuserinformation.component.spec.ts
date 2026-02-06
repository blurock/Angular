import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupuserinformationComponent } from './setupuserinformation.component';

describe('SetupuserinformationComponent', () => {
  let component: SetupuserinformationComponent;
  let fixture: ComponentFixture<SetupuserinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupuserinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupuserinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
