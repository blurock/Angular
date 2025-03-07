import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifydatasetcollectionidsComponent } from './modifydatasetcollectionids.component';

describe('ModifydatasetcollectionidsComponent', () => {
  let component: ModifydatasetcollectionidsComponent;
  let fixture: ComponentFixture<ModifydatasetcollectionidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifydatasetcollectionidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifydatasetcollectionidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
