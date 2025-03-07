import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecatalogobjectsfrompartitionsComponent } from './createcatalogobjectsfrompartitions.component';

describe('CreatecatalogobjectsfrompartitionsComponent', () => {
  let component: CreatecatalogobjectsfrompartitionsComponent;
  let fixture: ComponentFixture<CreatecatalogobjectsfrompartitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecatalogobjectsfrompartitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecatalogobjectsfrompartitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
