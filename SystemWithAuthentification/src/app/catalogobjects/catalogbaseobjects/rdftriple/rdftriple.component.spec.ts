import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdftripleComponent } from './rdftriple.component';

describe('RdftripleComponent', () => {
  let component: RdftripleComponent;
  let fixture: ComponentFixture<RdftripleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdftripleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdftripleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
