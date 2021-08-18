import {Directive, HostListener, HostBinding, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;


  constructor(private render: Renderer2, private elRef: ElementRef) {
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.render?.addClass(this.render.nextSibling(this.elRef.nativeElement), 'show')
    } else {
      this.render.removeClass(this.render.nextSibling(this.elRef.nativeElement), 'show')
    }
  }
}
