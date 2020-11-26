import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceinformationComponent } from './referenceinformation.component';

describe('ReferenceinformationComponent', () => {
  let component: ReferenceinformationComponent;
  let fixture: ComponentFixture<ReferenceinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
