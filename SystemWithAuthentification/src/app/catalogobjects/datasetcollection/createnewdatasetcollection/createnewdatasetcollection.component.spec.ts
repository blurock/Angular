import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewdatasetcollectionComponent } from './createnewdatasetcollection.component';

describe('CreatenewdatasetcollectionComponent', () => {
  let component: CreatenewdatasetcollectionComponent;
  let fixture: ComponentFixture<CreatenewdatasetcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewdatasetcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewdatasetcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
