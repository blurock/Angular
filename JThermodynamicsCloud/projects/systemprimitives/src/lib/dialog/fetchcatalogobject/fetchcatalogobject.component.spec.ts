import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchcatalogobjectComponent } from './fetchcatalogobject.component';

describe('FetchcatalogobjectComponent', () => {
  let component: FetchcatalogobjectComponent;
  let fixture: ComponentFixture<FetchcatalogobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchcatalogobjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchcatalogobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
