import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationtreeComponent } from './classificationtree.component';

describe('ClassificationtreeComponent', () => {
  let component: ClassificationtreeComponent;
  let fixture: ComponentFixture<ClassificationtreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationtreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
