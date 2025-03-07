import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common'; 
import {User} from 'firebase/auth';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule,MatDivider,MatMenuModule,NgIf,AsyncPipe],
})
export class ProfileCardComponent {
	
  @Input() user: Observable<User | null> = of(null);
  @Output() logoutClick: EventEmitter<null> = new EventEmitter<null>();

  logout() {
    this.logoutClick.emit();
  }
}