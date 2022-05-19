import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetrepositoryfilestagingComponent } from './datasetrepositoryfilestaging.component';

describe('DatasetrepositoryfilestagingComponent', () => {
  let component: DatasetrepositoryfilestagingComponent;
  let fixture: ComponentFixture<DatasetrepositoryfilestagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetrepositoryfilestagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetrepositoryfilestagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
