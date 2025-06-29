import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcatalogobjectComponent } from './uploadcatalogobject.component';

describe('UploadcatalogobjectComponent', () => {
  let component: UploadcatalogobjectComponent;
  let fixture: ComponentFixture<UploadcatalogobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadcatalogobjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadcatalogobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
