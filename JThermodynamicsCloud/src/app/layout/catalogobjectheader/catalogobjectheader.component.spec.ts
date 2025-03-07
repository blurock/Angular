import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogobjectheaderComponent } from './catalogobjectheader.component';

describe('CatalogobjectheaderComponent', () => {
  let component: CatalogobjectheaderComponent;
  let fixture: ComponentFixture<CatalogobjectheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogobjectheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogobjectheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
