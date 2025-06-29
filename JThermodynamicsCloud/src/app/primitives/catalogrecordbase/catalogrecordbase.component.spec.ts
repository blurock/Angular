import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogrecordbaseComponent } from './catalogrecordbase.component';

describe('CatalogrecordbaseComponent', () => {
  let component: CatalogrecordbaseComponent;
  let fixture: ComponentFixture<CatalogrecordbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogrecordbaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogrecordbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
