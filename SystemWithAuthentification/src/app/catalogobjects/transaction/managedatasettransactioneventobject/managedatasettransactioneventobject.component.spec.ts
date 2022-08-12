import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedatasettransactioneventobjectComponent } from './managedatasettransactioneventobject.component';

describe('ManagedatasettransactioneventobjectComponent', () => {
  let component: ManagedatasettransactioneventobjectComponent;
  let fixture: ComponentFixture<ManagedatasettransactioneventobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedatasettransactioneventobjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedatasettransactioneventobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
