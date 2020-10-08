import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationchooserComponent } from './classificationchooser.component';

describe('ClassificationchooserComponent', () => {
  let component: ClassificationchooserComponent;
  let fixture: ComponentFixture<ClassificationchooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationchooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationchooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
