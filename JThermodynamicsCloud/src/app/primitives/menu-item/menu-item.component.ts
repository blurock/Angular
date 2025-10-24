import {Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {NavItem} from '../nav-item';
import {MatMenuModule,MatMenuTrigger,MatMenu} from '@angular/material/menu'; 
import { CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  standalone: true,
  imports: [MatMenuModule,CommonModule,MatButtonModule,MatMenuTrigger,
  CommonModule, MatInputModule,MatFormFieldModule,ReactiveFormsModule]
})
export class MenuItemComponent implements OnInit {
  @Input() items: NavItem[] = [];
  @Output() selectionEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('topmenu') topmenu!: MatMenu;

onItemClick(item: NavItem): void {
    this.selectionEvent.emit(item.value);
  }
setValue(chosen: String | undefined) {
	if(chosen ) {
  this.selectionEvent.emit(chosen);
  }
}
  ngOnInit() {
  }
}
