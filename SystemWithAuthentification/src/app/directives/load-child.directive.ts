import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadChild]'
})
export class LoadChildDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
