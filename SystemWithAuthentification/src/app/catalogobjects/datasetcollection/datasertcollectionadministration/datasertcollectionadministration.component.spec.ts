import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasertcollectionadministrationComponent } from './datasertcollectionadministration.component';

describe('DatasertcollectionadministrationComponent', () => {
  let component: DatasertcollectionadministrationComponent;
  let fixture: ComponentFixture<DatasertcollectionadministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasertcollectionadministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasertcollectionadministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
