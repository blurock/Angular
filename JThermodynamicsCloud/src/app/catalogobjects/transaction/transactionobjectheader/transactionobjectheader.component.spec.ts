import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionobjectheaderComponent } from './transactionobjectheader.component';

describe('TransactionobjectheaderComponent', () => {
  let component: TransactionobjectheaderComponent;
  let fixture: ComponentFixture<TransactionobjectheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionobjectheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionobjectheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
