import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataobjectlinkComponent } from './dataobjectlink.component';

describe('DataobjectlinkComponent', () => {
  let component: DataobjectlinkComponent;
  let fixture: ComponentFixture<DataobjectlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataobjectlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataobjectlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
