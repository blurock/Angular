import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemconnectdatastructureComponent } from './chemconnectdatastructure.component';

describe('ChemconnectdatastructureComponent', () => {
  let component: ChemconnectdatastructureComponent;
  let fixture: ComponentFixture<ChemconnectdatastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemconnectdatastructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemconnectdatastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
