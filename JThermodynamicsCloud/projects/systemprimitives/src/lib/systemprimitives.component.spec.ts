import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemprimitivesComponent } from './systemprimitives.component';

describe('SystemprimitivesComponent', () => {
  let component: SystemprimitivesComponent;
  let fixture: ComponentFixture<SystemprimitivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemprimitivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemprimitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
