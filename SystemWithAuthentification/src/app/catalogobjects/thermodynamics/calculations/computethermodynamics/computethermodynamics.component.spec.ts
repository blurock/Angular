import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputethermodynamicsComponent } from './computethermodynamics.component';

describe('ComputethermodynamicsComponent', () => {
  let component: ComputethermodynamicsComponent;
  let fixture: ComponentFixture<ComputethermodynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputethermodynamicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputethermodynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
