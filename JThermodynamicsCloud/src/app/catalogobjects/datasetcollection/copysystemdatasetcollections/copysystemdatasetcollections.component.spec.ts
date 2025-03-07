import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopysystemdatasetcollectionsComponent } from './copysystemdatasetcollections.component';

describe('CopysystemdatasetcollectionsComponent', () => {
  let component: CopysystemdatasetcollectionsComponent;
  let fixture: ComponentFixture<CopysystemdatasetcollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopysystemdatasetcollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopysystemdatasetcollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
