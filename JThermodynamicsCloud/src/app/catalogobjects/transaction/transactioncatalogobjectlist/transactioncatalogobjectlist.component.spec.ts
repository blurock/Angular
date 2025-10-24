import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactioncatalogobjectlistComponent } from './transactioncatalogobjectlist.component';

describe('TransactioncatalogobjectlistComponent', () => {
  let component: TransactioncatalogobjectlistComponent;
  let fixture: ComponentFixture<TransactioncatalogobjectlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactioncatalogobjectlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactioncatalogobjectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
