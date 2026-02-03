import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibsetofauthorsComponent } from './bibsetofauthors.component';

describe('BibsetofauthorsComponent', () => {
  let component: BibsetofauthorsComponent;
  let fixture: ComponentFixture<BibsetofauthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibsetofauthorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibsetofauthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
