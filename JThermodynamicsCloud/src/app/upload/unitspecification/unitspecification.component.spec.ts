import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitspecificationComponent } from './unitspecification.component';

describe('UnitspecificationComponent', () => {
  let component: UnitspecificationComponent;
  let fixture: ComponentFixture<UnitspecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitspecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
