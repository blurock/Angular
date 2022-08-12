import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindspecifictransactionindatasetComponent } from './findspecifictransactionindataset.component';

describe('FindspecifictransactionindatasetComponent', () => {
  let component: FindspecifictransactionindatasetComponent;
  let fixture: ComponentFixture<FindspecifictransactionindatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindspecifictransactionindatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindspecifictransactionindatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
