import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionresultheaderComponent } from './transactionresultheader.component';

describe('TransactionresultheaderComponent', () => {
  let component: TransactionresultheaderComponent;
  let fixture: ComponentFixture<TransactionresultheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionresultheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionresultheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
