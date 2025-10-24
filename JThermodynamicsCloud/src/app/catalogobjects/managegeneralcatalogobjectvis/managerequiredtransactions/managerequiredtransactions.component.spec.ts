import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerequiredtransactionsComponent } from './managerequiredtransactions.component';

describe('ManagerequiredtransactionsComponent', () => {
  let component: ManagerequiredtransactionsComponent;
  let fixture: ComponentFixture<ManagerequiredtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerequiredtransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerequiredtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
