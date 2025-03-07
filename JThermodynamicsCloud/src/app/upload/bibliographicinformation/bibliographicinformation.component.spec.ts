import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographicinformationComponent } from './bibliographicinformation.component';

describe('BibliographicinformationComponent', () => {
  let component: BibliographicinformationComponent;
  let fixture: ComponentFixture<BibliographicinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliographicinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographicinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
