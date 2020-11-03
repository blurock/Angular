import { Component, EventEmitter, Input, Output } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input() user: firebase.User;
  @Output() logoutClick: EventEmitter<null> = new EventEmitter<null>();

  logout() {
    this.logoutClick.emit();
  }
}