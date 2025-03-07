import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchcollectiondatasetidsComponent } from './fetchcollectiondatasetids.component';

describe('FetchcollectiondatasetidsComponent', () => {
  let component: FetchcollectiondatasetidsComponent;
  let fixture: ComponentFixture<FetchcollectiondatasetidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchcollectiondatasetidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchcollectiondatasetidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
