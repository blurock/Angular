import { Directive} from '@angular/core';
import { ComponentProps, createElement, ElementType,ElementRef } from 'react';
import { createRoot } from 'react-dom/client';

@Directive({
  selector: '[appReactComponent]',
  //standalone: true
})
export class ReactComponentDirective<Comp extends ElementType> {

  constructor() { }
  


  ngOnChanges() {
  }

  ngOnDestroy() {
  }

}
