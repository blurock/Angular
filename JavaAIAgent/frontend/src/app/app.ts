
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Links to your chat UI
  templateUrl: './app.html', // Pointing to your renamed template file
  styleUrl: './app.scss'      // Or .scss depending on your choice
})
export class AppComponent {}
