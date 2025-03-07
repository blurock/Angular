import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfileinformationComponent } from './uploadfileinformation.component';

describe('UploadfileinformationComponent', () => {
  let component: UploadfileinformationComponent;
  let fixture: ComponentFixture<UploadfileinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadfileinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfileinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
