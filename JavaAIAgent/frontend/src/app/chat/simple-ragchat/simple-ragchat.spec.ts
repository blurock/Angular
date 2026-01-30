import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRAGChat } from './simple-ragchat';

describe('SimpleRAGChat', () => {
  let component: SimpleRAGChat;
  let fixture: ComponentFixture<SimpleRAGChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleRAGChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleRAGChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
