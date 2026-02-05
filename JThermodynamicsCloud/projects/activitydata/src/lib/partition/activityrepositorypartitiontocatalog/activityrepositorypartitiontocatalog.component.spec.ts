import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityrepositorypartitiontocatalogComponent } from './activityrepositorypartitiontocatalog.component';

describe('ActivityrepositorypartitiontocatalogComponent', () => {
  let component: ActivityrepositorypartitiontocatalogComponent;
  let fixture: ComponentFixture<ActivityrepositorypartitiontocatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityrepositorypartitiontocatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityrepositorypartitiontocatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
