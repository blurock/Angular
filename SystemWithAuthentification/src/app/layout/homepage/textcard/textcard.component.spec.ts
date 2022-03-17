import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextcardComponent } from './textcard.component';

describe('TextcardComponent', () => {
  let component: TextcardComponent;
  let fixture: ComponentFixture<TextcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
