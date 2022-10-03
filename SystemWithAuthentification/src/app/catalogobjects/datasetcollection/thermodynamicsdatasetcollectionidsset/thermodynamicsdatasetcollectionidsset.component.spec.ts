import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermodynamicsdatasetcollectionidssetComponent } from './thermodynamicsdatasetcollectionidsset.component';

describe('ThermodynamicsdatasetcollectionidssetComponent', () => {
  let component: ThermodynamicsdatasetcollectionidssetComponent;
  let fixture: ComponentFixture<ThermodynamicsdatasetcollectionidssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThermodynamicsdatasetcollectionidssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermodynamicsdatasetcollectionidssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
