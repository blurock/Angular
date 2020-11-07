import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogbasedataComponent } from './catalogbasedata.component';

describe('CatalogbasedataComponent', () => {
  let component: CatalogbasedataComponent;
  let fixture: ComponentFixture<CatalogbasedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogbasedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogbasedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
