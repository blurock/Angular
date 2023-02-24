import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationcardsComponent } from './applicationcards.component';

describe('ApplicationcardsComponent', () => {
  let component: ApplicationcardsComponent;
  let fixture: ComponentFixture<ApplicationcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
