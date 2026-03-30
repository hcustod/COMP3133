import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]',
})
export class InputFormat {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('blur')
  onBlur(): void {
    const input = this.elementRef.nativeElement;
    input.value = (input.value ?? '').toUpperCase();
  }
}
