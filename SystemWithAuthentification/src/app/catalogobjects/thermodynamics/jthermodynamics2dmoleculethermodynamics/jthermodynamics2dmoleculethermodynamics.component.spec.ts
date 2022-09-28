import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jthermodynamics2dmoleculethermodynamicsComponent } from './jthermodynamics2dmoleculethermodynamics.component';

describe('Jthermodynamics2dmoleculethermodynamicsComponent', () => {
  let component: Jthermodynamics2dmoleculethermodynamicsComponent;
  let fixture: ComponentFixture<Jthermodynamics2dmoleculethermodynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jthermodynamics2dmoleculethermodynamicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jthermodynamics2dmoleculethermodynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
