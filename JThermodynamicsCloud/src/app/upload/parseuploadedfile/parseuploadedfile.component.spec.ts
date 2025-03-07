import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseuploadedfileComponent } from './parseuploadedfile.component';

describe('ParseuploadedfileComponent', () => {
  let component: ParseuploadedfileComponent;
  let fixture: ComponentFixture<ParseuploadedfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParseuploadedfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseuploadedfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
