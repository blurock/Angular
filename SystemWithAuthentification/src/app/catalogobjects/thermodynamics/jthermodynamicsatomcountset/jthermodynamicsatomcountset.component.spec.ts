import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicsatomcountsetComponent } from './jthermodynamicsatomcountset.component';

describe('JthermodynamicsatomcountsetComponent', () => {
  let component: JthermodynamicsatomcountsetComponent;
  let fixture: ComponentFixture<JthermodynamicsatomcountsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicsatomcountsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicsatomcountsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
