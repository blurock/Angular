import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogbaseComponent } from './catalogbase.component';

describe('CatalogbaseComponent', () => {
  let component: CatalogbaseComponent;
  let fixture: ComponentFixture<CatalogbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogbaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
