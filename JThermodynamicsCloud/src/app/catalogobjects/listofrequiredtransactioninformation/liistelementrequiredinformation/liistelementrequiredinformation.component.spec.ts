import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiistelementrequiredinformationComponent } from './liistelementrequiredinformation.component';

describe('LiistelementrequiredinformationComponent', () => {
  let component: LiistelementrequiredinformationComponent;
  let fixture: ComponentFixture<LiistelementrequiredinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiistelementrequiredinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiistelementrequiredinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
