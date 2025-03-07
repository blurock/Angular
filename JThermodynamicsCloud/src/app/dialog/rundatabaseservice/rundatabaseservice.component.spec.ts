import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RundatabaseserviceComponent } from './rundatabaseservice.component';

describe('RundatabaseserviceComponent', () => {
  let component: RundatabaseserviceComponent;
  let fixture: ComponentFixture<RundatabaseserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RundatabaseserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RundatabaseserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
