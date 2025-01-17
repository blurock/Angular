import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {KetcherwrapperComponent} from './ketcherwrapper/ketcherwrapper.component';
@Component({
  selector: 'app-root',
    imports: [
  KetcherwrapperComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KetcherApplication';
}
