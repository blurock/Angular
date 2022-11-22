import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermodynamiccontributionsComponent } from './thermodynamiccontributions.component';

describe('ThermodynamiccontributionsComponent', () => {
  let component: ThermodynamiccontributionsComponent;
  let fixture: ComponentFixture<ThermodynamiccontributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThermodynamiccontributionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermodynamiccontributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
