import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogidComponent } from './catalogid.component';

describe('CatalogidComponent', () => {
  let component: CatalogidComponent;
  let fixture: ComponentFixture<CatalogidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
