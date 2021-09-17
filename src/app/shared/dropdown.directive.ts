import {Directive, HostListener, HostBinding, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    if (this.isOpen) {
          this.render?.addClass(this.render.nextSibling(this.elRef.nativeElement), 'show')
        } else {
          this.render.removeClass(this.render.nextSibling(this.elRef.nativeElement), 'show')
        }
  }

  constructor(private render: Renderer2, private elRef: ElementRef) {
  }

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  //   if (this.isOpen) {
  //     this.render?.addClass(this.render.nextSibling(this.elRef.nativeElement), 'show')
  //   } else {
  //     this.render.removeClass(this.render.nextSibling(this.elRef.nativeElement), 'show')
  //   }
  // }
}
