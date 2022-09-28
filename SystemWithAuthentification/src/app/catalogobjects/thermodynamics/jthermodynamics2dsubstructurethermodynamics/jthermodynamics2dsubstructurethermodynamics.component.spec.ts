import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jthermodynamics2dsubstructurethermodynamicsComponent } from './jthermodynamics2dsubstructurethermodynamics.component';

describe('Jthermodynamics2dsubstructurethermodynamicsComponent', () => {
  let component: Jthermodynamics2dsubstructurethermodynamicsComponent;
  let fixture: ComponentFixture<Jthermodynamics2dsubstructurethermodynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jthermodynamics2dsubstructurethermodynamicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
