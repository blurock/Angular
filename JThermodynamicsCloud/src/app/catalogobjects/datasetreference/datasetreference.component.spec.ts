import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetreferenceComponent } from './datasetreference.component';

describe('DatasetreferenceComponent', () => {
  let component: DatasetreferenceComponent;
  let fixture: ComponentFixture<DatasetreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
