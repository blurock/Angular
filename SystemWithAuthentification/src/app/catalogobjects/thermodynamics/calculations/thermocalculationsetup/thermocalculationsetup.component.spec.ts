import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermocalculationsetupComponent } from './thermocalculationsetup.component';

describe('ThermocalculationsetupComponent', () => {
  let component: ThermocalculationsetupComponent;
  let fixture: ComponentFixture<ThermocalculationsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThermocalculationsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermocalculationsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
