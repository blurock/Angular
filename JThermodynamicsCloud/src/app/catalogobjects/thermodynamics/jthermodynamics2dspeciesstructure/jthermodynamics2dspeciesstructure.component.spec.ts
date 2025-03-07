import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jthermodynamics2dspeciesstructureComponent } from './jthermodynamics2dspeciesstructure.component';

describe('Jthermodynamics2dspeciesstructureComponent', () => {
  let component: Jthermodynamics2dspeciesstructureComponent;
  let fixture: ComponentFixture<Jthermodynamics2dspeciesstructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jthermodynamics2dspeciesstructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jthermodynamics2dspeciesstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
