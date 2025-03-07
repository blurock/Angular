import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogbaseextraComponent } from './catalogbaseextra.component';

describe('CatalogbaseextraComponent', () => {
  let component: CatalogbaseextraComponent;
  let fixture: ComponentFixture<CatalogbaseextraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogbaseextraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogbaseextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
