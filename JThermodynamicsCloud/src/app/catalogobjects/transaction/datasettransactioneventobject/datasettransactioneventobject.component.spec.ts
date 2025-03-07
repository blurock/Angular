import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasettransactioneventobjectComponent } from './datasettransactioneventobject.component';

describe('DatasettransactioneventobjectComponent', () => {
  let component: DatasettransactioneventobjectComponent;
  let fixture: ComponentFixture<DatasettransactioneventobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasettransactioneventobjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasettransactioneventobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
