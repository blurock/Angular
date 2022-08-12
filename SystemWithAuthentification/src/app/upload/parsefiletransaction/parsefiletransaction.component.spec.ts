import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsefiletransactionComponent } from './parsefiletransaction.component';

describe('ParsefiletransactionComponent', () => {
  let component: ParsefiletransactionComponent;
  let fixture: ComponentFixture<ParsefiletransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParsefiletransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsefiletransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
