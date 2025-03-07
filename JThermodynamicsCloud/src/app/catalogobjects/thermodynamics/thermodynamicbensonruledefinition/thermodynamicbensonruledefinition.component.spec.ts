import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermodynamicbensonruledefinitionComponent } from './thermodynamicbensonruledefinition.component';

describe('ThermodynamicbensonruledefinitionComponent', () => {
  let component: ThermodynamicbensonruledefinitionComponent;
  let fixture: ComponentFixture<ThermodynamicbensonruledefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThermodynamicbensonruledefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermodynamicbensonruledefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
