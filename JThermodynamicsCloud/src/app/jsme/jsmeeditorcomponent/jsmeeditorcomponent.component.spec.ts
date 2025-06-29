import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsmeeditorcomponentComponent } from './jsmeeditorcomponent.component';

describe('JsmeeditorcomponentComponent', () => {
  let component: JsmeeditorcomponentComponent;
  let fixture: ComponentFixture<JsmeeditorcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsmeeditorcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsmeeditorcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
