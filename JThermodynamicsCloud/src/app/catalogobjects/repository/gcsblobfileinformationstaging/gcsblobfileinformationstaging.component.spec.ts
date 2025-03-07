import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcsblobfileinformationstagingComponent } from './gcsblobfileinformationstaging.component';

describe('GcsblobfileinformationstagingComponent', () => {
  let component: GcsblobfileinformationstagingComponent;
  let fixture: ComponentFixture<GcsblobfileinformationstagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcsblobfileinformationstagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GcsblobfileinformationstagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
