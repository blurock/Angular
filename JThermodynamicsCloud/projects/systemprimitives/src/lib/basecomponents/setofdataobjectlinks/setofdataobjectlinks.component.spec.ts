import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetofdataobjectlinksComponent } from './setofdataobjectlinks.component';

describe('SetofdataobjectlinksComponent', () => {
  let component: SetofdataobjectlinksComponent;
  let fixture: ComponentFixture<SetofdataobjectlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetofdataobjectlinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetofdataobjectlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
