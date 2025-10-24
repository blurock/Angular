import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredtransactionblockComponent } from './requiredtransactionblock.component';

describe('RequiredtransactionblockComponent', () => {
  let component: RequiredtransactionblockComponent;
  let fixture: ComponentFixture<RequiredtransactionblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredtransactionblockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredtransactionblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
