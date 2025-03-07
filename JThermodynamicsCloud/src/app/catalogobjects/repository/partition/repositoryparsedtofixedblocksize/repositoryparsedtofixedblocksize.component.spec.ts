import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryparsedtofixedblocksizeComponent } from './repositoryparsedtofixedblocksize.component';

describe('RepositoryparsedtofixedblocksizeComponent', () => {
  let component: RepositoryparsedtofixedblocksizeComponent;
  let fixture: ComponentFixture<RepositoryparsedtofixedblocksizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryparsedtofixedblocksizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryparsedtofixedblocksizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
