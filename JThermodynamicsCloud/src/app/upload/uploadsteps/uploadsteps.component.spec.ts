import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadstepsComponent } from './uploadsteps.component';

describe('UploadstepsComponent', () => {
  let component: UploadstepsComponent;
  let fixture: ComponentFixture<UploadstepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadstepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
