import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnelineprimitiveComponent } from './onelineprimitive.component';

describe('OnelineprimitiveComponent', () => {
  let component: OnelineprimitiveComponent;
  let fixture: ComponentFixture<OnelineprimitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnelineprimitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnelineprimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
