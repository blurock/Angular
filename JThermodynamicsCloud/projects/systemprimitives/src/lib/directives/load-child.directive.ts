import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadChild]',
  standalone: true
})
export class LoadChildDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
