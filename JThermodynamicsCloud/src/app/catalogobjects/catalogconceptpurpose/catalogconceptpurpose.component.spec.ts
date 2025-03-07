import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogconceptpurposeComponent } from './catalogconceptpurpose.component';

describe('CatalogconceptpurposeComponent', () => {
  let component: CatalogconceptpurposeComponent;
  let fixture: ComponentFixture<CatalogconceptpurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogconceptpurposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogconceptpurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
