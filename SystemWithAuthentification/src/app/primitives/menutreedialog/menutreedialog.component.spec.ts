import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutreedialogComponent } from './menutreedialog.component';

describe('MenutreedialogComponent', () => {
  let component: MenutreedialogComponent;
  let fixture: ComponentFixture<MenutreedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenutreedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutreedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
