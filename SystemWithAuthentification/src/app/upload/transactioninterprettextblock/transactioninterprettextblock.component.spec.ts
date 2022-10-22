import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactioninterprettextblockComponent } from './transactioninterprettextblock.component';

describe('TransactioninterprettextblockComponent', () => {
  let component: TransactioninterprettextblockComponent;
  let fixture: ComponentFixture<TransactioninterprettextblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactioninterprettextblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactioninterprettextblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
