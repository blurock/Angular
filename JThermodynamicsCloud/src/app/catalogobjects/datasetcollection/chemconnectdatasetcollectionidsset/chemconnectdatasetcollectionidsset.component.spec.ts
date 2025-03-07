import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemconnectdatasetcollectionidssetComponent } from './chemconnectdatasetcollectionidsset.component';

describe('ChemconnectdatasetcollectionidssetComponent', () => {
  let component: ChemconnectdatasetcollectionidssetComponent;
  let fixture: ComponentFixture<ChemconnectdatasetcollectionidssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemconnectdatasetcollectionidssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemconnectdatasetcollectionidssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
