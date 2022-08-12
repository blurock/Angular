import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasettransactionspecificationforcollectionComponent } from './datasettransactionspecificationforcollection.component';

describe('DatasettransactionspecificationforcollectionComponent', () => {
  let component: DatasettransactionspecificationforcollectionComponent;
  let fixture: ComponentFixture<DatasettransactionspecificationforcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasettransactionspecificationforcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasettransactionspecificationforcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
