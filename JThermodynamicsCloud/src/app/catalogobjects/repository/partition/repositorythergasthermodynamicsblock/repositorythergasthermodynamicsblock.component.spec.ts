import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorythergasthermodynamicsblockComponent } from './repositorythergasthermodynamicsblock.component';

describe('RepositorythergasthermodynamicsblockComponent', () => {
  let component: RepositorythergasthermodynamicsblockComponent;
  let fixture: ComponentFixture<RepositorythergasthermodynamicsblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorythergasthermodynamicsblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorythergasthermodynamicsblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
