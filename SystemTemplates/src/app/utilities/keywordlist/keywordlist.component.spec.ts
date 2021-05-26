import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeywordlistComponent } from './keywordlist.component';

describe('KeywordlistComponent', () => {
  let component: KeywordlistComponent;
  let fixture: ComponentFixture<KeywordlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
