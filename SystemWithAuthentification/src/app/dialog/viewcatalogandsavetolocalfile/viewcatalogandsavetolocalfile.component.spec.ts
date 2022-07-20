import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcatalogandsavetolocalfileComponent } from './viewcatalogandsavetolocalfile.component';

describe('ViewcatalogandsavetolocalfileComponent', () => {
  let component: ViewcatalogandsavetolocalfileComponent;
  let fixture: ComponentFixture<ViewcatalogandsavetolocalfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcatalogandsavetolocalfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcatalogandsavetolocalfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
