import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterspecificationComponent } from './parameterspecification.component';

describe('ParameterspecificationComponent', () => {
  let component: ParameterspecificationComponent;
  let fixture: ComponentFixture<ParameterspecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterspecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
