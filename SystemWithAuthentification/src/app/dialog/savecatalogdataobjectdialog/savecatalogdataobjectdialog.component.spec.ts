import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavecatalogdataobjectdialogComponent } from './savecatalogdataobjectdialog.component';

describe('SavecatalogdataobjectdialogComponent', () => {
  let component: SavecatalogdataobjectdialogComponent;
  let fixture: ComponentFixture<SavecatalogdataobjectdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavecatalogdataobjectdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavecatalogdataobjectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
