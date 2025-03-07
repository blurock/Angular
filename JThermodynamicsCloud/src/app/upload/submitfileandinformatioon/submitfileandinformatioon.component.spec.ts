import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitfileandinformatioonComponent } from './submitfileandinformatioon.component';

describe('SubmitfileandinformatioonComponent', () => {
  let component: SubmitfileandinformatioonComponent;
  let fixture: ComponentFixture<SubmitfileandinformatioonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitfileandinformatioonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitfileandinformatioonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
