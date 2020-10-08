import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { GenericdatapickerComponent } from './genericdatapicker.component';

describe('GenericdatapickerComponent', () => {
  let component: GenericdatapickerComponent;
  let fixture: ComponentFixture<GenericdatapickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericdatapickerComponent],
      imports: [MatDatepickerModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericdatapickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
