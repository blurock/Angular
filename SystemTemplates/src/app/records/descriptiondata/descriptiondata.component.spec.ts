import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import { DescriptiondataComponent } from './descriptiondata.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';


describe('DescriptiondataComponent', () => {
  let component: DescriptiondataComponent;
  let fixture: ComponentFixture<DescriptiondataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptiondataComponent ],
      imports: [MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatDividerModule,
        MatGridListModule,
      MatChipsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptiondataComponent ],
      imports: [MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatDividerModule,
        MatGridListModule,
      MatChipsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DescriptiondataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
