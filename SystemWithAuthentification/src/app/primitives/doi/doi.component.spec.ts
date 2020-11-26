import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoiComponent } from './doi.component';

describe('DoiComponent', () => {
  let component: DoiComponent;
  let fixture: ComponentFixture<DoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
