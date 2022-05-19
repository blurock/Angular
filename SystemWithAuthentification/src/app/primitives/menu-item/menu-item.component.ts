import {Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NavItem} from '../nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: NavItem[];
  @Output() selectionEvent: EventEmitter<String> = new EventEmitter();
  @ViewChild('childMenu') public childMenu;

  constructor(public router: Router) {
  }

setValue(chosen: string) {
  this.selectionEvent.emit(chosen);
}
  ngOnInit() {
  }
}
