import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaprimitiveComponent } from './textareaprimitive.component';

describe('TextareaprimitiveComponent', () => {
  let component: TextareaprimitiveComponent;
  let fixture: ComponentFixture<TextareaprimitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaprimitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaprimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
