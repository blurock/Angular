import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralcatalogobjectvisualizationComponent } from './generalcatalogobjectvisualization.component';

describe('GeneralcatalogobjectvisualizationComponent', () => {
  let component: GeneralcatalogobjectvisualizationComponent;
  let fixture: ComponentFixture<GeneralcatalogobjectvisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralcatalogobjectvisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralcatalogobjectvisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
