import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavecatalogdataobjectComponent } from './savecatalogdataobject.component';

describe('SavecatalogdataobjectComponent', () => {
  let component: SavecatalogdataobjectComponent;
  let fixture: ComponentFixture<SavecatalogdataobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavecatalogdataobjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavecatalogdataobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
