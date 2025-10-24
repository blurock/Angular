import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredtransactioninformationComponent } from './requiredtransactioninformation.component';

describe('RequiredtransactioninformationComponent', () => {
  let component: RequiredtransactioninformationComponent;
  let fixture: ComponentFixture<RequiredtransactioninformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredtransactioninformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredtransactioninformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
