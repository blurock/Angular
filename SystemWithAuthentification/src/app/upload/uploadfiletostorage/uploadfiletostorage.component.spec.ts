import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfiletostorageComponent } from './uploadfiletostorage.component';

describe('UploadfiletostorageComponent', () => {
  let component: UploadfiletostorageComponent;
  let fixture: ComponentFixture<UploadfiletostorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadfiletostorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfiletostorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
