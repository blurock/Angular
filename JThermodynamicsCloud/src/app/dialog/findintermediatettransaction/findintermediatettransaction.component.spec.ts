import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindintermediatettransactionComponent } from './findintermediatettransaction.component';

describe('FindintermediatettransactionComponent', () => {
  let component: FindintermediatettransactionComponent;
  let fixture: ComponentFixture<FindintermediatettransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindintermediatettransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindintermediatettransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
