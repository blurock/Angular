import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizedatasetcollectionidsComponent } from './visualizedatasetcollectionids.component';

describe('VisualizedatasetcollectionidsComponent', () => {
  let component: VisualizedatasetcollectionidsComponent;
  let fixture: ComponentFixture<VisualizedatasetcollectionidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizedatasetcollectionidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizedatasetcollectionidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
