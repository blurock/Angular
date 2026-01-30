import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHITL } from './chat-hitl';

describe('ChatHITL', () => {
  let component: ChatHITL;
  let fixture: ComponentFixture<ChatHITL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHITL]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHITL);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
