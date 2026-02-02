import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizefileComponent } from './visualizefile.component';

describe('VisualizefileComponent', () => {
  let component: VisualizefileComponent;
  let fixture: ComponentFixture<VisualizefileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizefileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
