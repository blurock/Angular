import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { InputlineComponent } from './inputline.component';

describe('InputlineComponent', () => {
  let component: InputlineComponent;
  let fixture: ComponentFixture<InputlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputlineComponent ],
      imports: [MatCheckboxModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
