import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordlistprimitiveComponent } from './keywordlistprimitive.component';

describe('KeywordlistprimitiveComponent', () => {
  let component: KeywordlistprimitiveComponent;
  let fixture: ComponentFixture<KeywordlistprimitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordlistprimitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordlistprimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
