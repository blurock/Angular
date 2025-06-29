import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactioneventobjectComponent } from './transactioneventobject.component';

describe('TransactioneventobjectComponent', () => {
  let component: TransactioneventobjectComponent;
  let fixture: ComponentFixture<TransactioneventobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactioneventobjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactioneventobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
