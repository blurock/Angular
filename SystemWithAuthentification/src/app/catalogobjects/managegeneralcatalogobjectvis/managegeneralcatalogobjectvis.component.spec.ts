import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagegeneralcatalogobjectvisComponent } from './managegeneralcatalogobjectvis.component';

describe('ManagegeneralcatalogobjectvisComponent', () => {
  let component: ManagegeneralcatalogobjectvisComponent;
  let fixture: ComponentFixture<ManagegeneralcatalogobjectvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagegeneralcatalogobjectvisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagegeneralcatalogobjectvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
