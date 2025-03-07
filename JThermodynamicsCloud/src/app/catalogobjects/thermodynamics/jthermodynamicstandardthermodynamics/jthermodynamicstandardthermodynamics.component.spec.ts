import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicstandardthermodynamicsComponent } from './jthermodynamicstandardthermodynamics.component';

describe('JthermodynamicstandardthermodynamicsComponent', () => {
  let component: JthermodynamicstandardthermodynamicsComponent;
  let fixture: ComponentFixture<JthermodynamicstandardthermodynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicstandardthermodynamicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicstandardthermodynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
