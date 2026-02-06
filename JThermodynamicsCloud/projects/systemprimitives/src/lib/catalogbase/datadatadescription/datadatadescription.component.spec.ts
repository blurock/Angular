import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatadatadescriptionComponent } from './datadatadescription.component';

describe('DatadatadescriptionComponent', () => {
  let component: DatadatadescriptionComponent;
  let fixture: ComponentFixture<DatadatadescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatadatadescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatadatadescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
