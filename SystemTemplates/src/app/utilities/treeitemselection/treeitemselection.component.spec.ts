import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeitemselectionComponent } from './treeitemselection.component';

describe('TreeitemselectionComponent', () => {
  let component: TreeitemselectionComponent;
  let fixture: ComponentFixture<TreeitemselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeitemselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeitemselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
