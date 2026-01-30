import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemconstantsComponent } from './systemconstants.component';

describe('SystemconstantsComponent', () => {
  let component: SystemconstantsComponent;
  let fixture: ComponentFixture<SystemconstantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemconstantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemconstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
