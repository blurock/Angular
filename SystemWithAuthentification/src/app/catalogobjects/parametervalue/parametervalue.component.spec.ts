import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametervalueComponent } from './parametervalue.component';

describe('ParametervalueComponent', () => {
  let component: ParametervalueComponent;
  let fixture: ComponentFixture<ParametervalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametervalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametervalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
