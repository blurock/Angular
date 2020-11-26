import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameofpersonComponent } from './nameofperson.component';

describe('NameofpersonComponent', () => {
  let component: NameofpersonComponent;
  let fixture: ComponentFixture<NameofpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameofpersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameofpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
