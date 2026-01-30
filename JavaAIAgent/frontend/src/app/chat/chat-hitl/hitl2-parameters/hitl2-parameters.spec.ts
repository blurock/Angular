import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HITL2Parameters } from './hitl2-parameters';

describe('HITL2Parameters', () => {
  let component: HITL2Parameters;
  let fixture: ComponentFixture<HITL2Parameters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HITL2Parameters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HITL2Parameters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
