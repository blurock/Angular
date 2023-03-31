import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetcollectionchoicemenuComponent } from './datasetcollectionchoicemenu.component';

describe('DatasetcollectionchoicemenuComponent', () => {
  let component: DatasetcollectionchoicemenuComponent;
  let fixture: ComponentFixture<DatasetcollectionchoicemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetcollectionchoicemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetcollectionchoicemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
