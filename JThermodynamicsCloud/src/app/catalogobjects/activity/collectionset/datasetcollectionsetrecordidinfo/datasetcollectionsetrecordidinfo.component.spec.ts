import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetcollectionsetrecordidinfoComponent } from './datasetcollectionsetrecordidinfo.component';

describe('DatasetcollectionsetrecordidinfoComponent', () => {
  let component: DatasetcollectionsetrecordidinfoComponent;
  let fixture: ComponentFixture<DatasetcollectionsetrecordidinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetcollectionsetrecordidinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetcollectionsetrecordidinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
