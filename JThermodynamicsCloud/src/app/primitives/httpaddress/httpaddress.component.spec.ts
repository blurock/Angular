import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpaddressComponent } from './httpaddress.component';

describe('HttpaddressComponent', () => {
  let component: HttpaddressComponent;
  let fixture: ComponentFixture<HttpaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
