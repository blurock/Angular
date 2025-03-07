import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[dynamicChildLoader]',
  standalone: true
})
export class LoadchildDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

