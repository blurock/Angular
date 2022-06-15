import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntransactiondialogComponent } from './runtransactiondialog.component';

describe('RuntransactiondialogComponent', () => {
  let component: RuntransactiondialogComponent;
  let fixture: ComponentFixture<RuntransactiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuntransactiondialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntransactiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
