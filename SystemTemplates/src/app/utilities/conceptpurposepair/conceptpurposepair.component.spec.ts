import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConceptpurposepairComponent } from './conceptpurposepair.component';

describe('ConceptpurposepairComponent', () => {
  let component: ConceptpurposepairComponent;
  let fixture: ComponentFixture<ConceptpurposepairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptpurposepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptpurposepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
