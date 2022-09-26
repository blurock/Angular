import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicsvibrationalstructureComponent } from './jthermodynamicsvibrationalstructure.component';

describe('JthermodynamicsvibrationalstructureComponent', () => {
  let component: JthermodynamicsvibrationalstructureComponent;
  let fixture: ComponentFixture<JthermodynamicsvibrationalstructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicsvibrationalstructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicsvibrationalstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
