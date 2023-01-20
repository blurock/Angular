import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinddatasetcollectionidsetsComponent } from './finddatasetcollectionidsets.component';

describe('FinddatasetcollectionidsetsComponent', () => {
  let component: FinddatasetcollectionidsetsComponent;
  let fixture: ComponentFixture<FinddatasetcollectionidsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinddatasetcollectionidsetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinddatasetcollectionidsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
