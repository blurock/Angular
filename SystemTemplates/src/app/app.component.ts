import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogChanges } from './shared/catalogchanges';
import { OntoogyannotationinfoService } from './services/ontoogyannotationinfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  static fromEvent(target: HTMLInputElement, eventName: string) {
    return new Observable((observer) => {
      const handler = (e: unknown) => observer.next(e);

      target.addEventListener(eventName, handler);

      return () => {
        target.removeEventListener(eventName, handler);
      };
    });
  }

  constructor(private ontologyservice: OntoogyannotationinfoService) {
  }
  ngOnInit(): void {

  }

  public addChange(label: string, catalog: string,
                   catalogChangesList: CatalogChanges[]): void {

    catalogChangesList.forEach(element => {
      if (element.catalogObject === catalog) {
        element.labels.push(label);
      }
    });
  }
}

