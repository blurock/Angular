import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofrequiredtransactioninformationComponent } from './listofrequiredtransactioninformation.component';

describe('ListofrequiredtransactioninformationComponent', () => {
  let component: ListofrequiredtransactioninformationComponent;
  let fixture: ComponentFixture<ListofrequiredtransactioninformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListofrequiredtransactioninformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListofrequiredtransactioninformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
