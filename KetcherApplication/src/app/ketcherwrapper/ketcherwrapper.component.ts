import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

@Component({
	selector: 'app-ketcherwrapper',
	imports: [],
	template: '<p>ketcherwrapper works!</p><div id="react-root"></div>',
	styleUrl: './ketcherwrapper.component.css'
})




export class KetcherwrapperComponent implements AfterViewInit, OnDestroy {
	constructor(private hostElement: ElementRef) {}

  ngAfterViewInit() {
	alert("ngAfterViewInit 1");
    const container = this.hostElement.nativeElement.querySelector('#react-root');
	alert("ngAfterViewInit 2");
    const code = App();
    ReactDOM.render(code, container);
	alert("ngAfterViewInit 3");
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.hostElement.nativeElement.querySelector('#react-root'));
  }

}
