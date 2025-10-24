import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerdfcatalogidelelementsComponent } from './managerdfcatalogidelelements.component';

describe('ManagerdfcatalogidelelementsComponent', () => {
  let component: ManagerdfcatalogidelelementsComponent;
  let fixture: ComponentFixture<ManagerdfcatalogidelelementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerdfcatalogidelelementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerdfcatalogidelelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
