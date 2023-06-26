import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminedatabaseelementsComponent } from './examinedatabaseelements.component';

describe('ExaminedatabaseelementsComponent', () => {
  let component: ExaminedatabaseelementsComponent;
  let fixture: ComponentFixture<ExaminedatabaseelementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminedatabaseelementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminedatabaseelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
