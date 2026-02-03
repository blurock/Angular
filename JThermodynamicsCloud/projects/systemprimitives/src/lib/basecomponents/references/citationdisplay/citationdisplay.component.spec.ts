import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationdisplayComponent } from './citationdisplay.component';

describe('CitationdisplayComponent', () => {
  let component: CitationdisplayComponent;
  let fixture: ComponentFixture<CitationdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitationdisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitationdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
