import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationfordatasetComponent } from './specificationfordataset.component';

describe('SpecificationfordatasetComponent', () => {
  let component: SpecificationfordatasetComponent;
  let fixture: ComponentFixture<SpecificationfordatasetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificationfordatasetComponent]
    });
    fixture = TestBed.createComponent(SpecificationfordatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
