import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetofsitereferencesComponent } from './setofsitereferences.component';

describe('SetofsitereferencesComponent', () => {
  let component: SetofsitereferencesComponent;
  let fixture: ComponentFixture<SetofsitereferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetofsitereferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetofsitereferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
