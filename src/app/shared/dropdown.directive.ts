import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open')
    isOpen: boolean = false;

    // @HostListener('click') onClickToggle() {
    //     this.isOpen = !this.isOpen;
    // }

    @HostListener('document:click', ['$event']) onClick(event: Event) {
        if (this.elementRef.nativeElement.contains(event.target)){
            this.isOpen = !this.isOpen;
        } else {
            this.isOpen = false;
        }



    }

    constructor(private elementRef: ElementRef){}
}