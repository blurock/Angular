import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[dynamicChildLoader]'
})
export class LoadchildDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
