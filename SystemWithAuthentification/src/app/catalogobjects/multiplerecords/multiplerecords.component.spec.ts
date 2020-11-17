import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplerecordsComponent } from './multiplerecords.component';

describe('MultiplerecordsComponent', () => {
  let component: MultiplerecordsComponent;
  let fixture: ComponentFixture<MultiplerecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplerecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplerecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
