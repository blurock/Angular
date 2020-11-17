import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplechoiceprimitiveComponent } from './simplechoiceprimitive.component';

describe('SimplechoiceprimitiveComponent', () => {
  let component: SimplechoiceprimitiveComponent;
  let fixture: ComponentFixture<SimplechoiceprimitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplechoiceprimitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplechoiceprimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
