import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogactivitybaseComponent } from './catalogactivitybase.component';

describe('CatalogactivitybaseComponent', () => {
  let component: CatalogactivitybaseComponent;
  let fixture: ComponentFixture<CatalogactivitybaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogactivitybaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogactivitybaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
