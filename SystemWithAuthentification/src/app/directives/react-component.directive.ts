import { Directive } from '@angular/core';
import { ComponentProps, createElement, ElementType,Input,inject,ElementRef } from 'react';
import { createRoot } from 'react-dom/client';

@Directive({
  selector: '[appReactComponent]',
  //standalone: true
})
export class ReactComponentDirective<Comp extends ElementType> {

  constructor() { }
  
  @Input() reactComponent: Comp;
  @Input() props: ComponentProps<Comp>;

private root = createRoot(inject(ElementRef).nativeElement)

  ngOnChanges() {
    this.root.render(createElement(this.reactComponent, this.props))
  }

  ngOnDestroy() {
    this.root.unmount();
  }

}
