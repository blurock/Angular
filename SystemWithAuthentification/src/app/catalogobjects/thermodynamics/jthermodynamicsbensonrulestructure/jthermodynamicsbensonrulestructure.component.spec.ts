import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthermodynamicsbensonrulestructureComponent } from './jthermodynamicsbensonrulestructure.component';

describe('JthermodynamicsbensonrulestructureComponent', () => {
  let component: JthermodynamicsbensonrulestructureComponent;
  let fixture: ComponentFixture<JthermodynamicsbensonrulestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthermodynamicsbensonrulestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthermodynamicsbensonrulestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
