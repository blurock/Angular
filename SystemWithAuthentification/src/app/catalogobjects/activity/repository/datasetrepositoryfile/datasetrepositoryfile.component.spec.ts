import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetrepositoryfileComponent } from './datasetrepositoryfile.component';

describe('DatasetrepositoryfileComponent', () => {
  let component: DatasetrepositoryfileComponent;
  let fixture: ComponentFixture<DatasetrepositoryfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetrepositoryfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetrepositoryfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
