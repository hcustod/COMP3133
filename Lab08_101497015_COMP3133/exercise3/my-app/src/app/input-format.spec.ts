import { ElementRef } from '@angular/core';

import { InputFormat } from './input-format';

describe('InputFormat', () => {
  it('should create an instance', () => {
    const directive = new InputFormat(new ElementRef(document.createElement('input')));
    expect(directive).toBeTruthy();
  });

  it('should convert text to uppercase on blur', () => {
    const input = document.createElement('input');
    input.value = 'henrique';

    const directive = new InputFormat(new ElementRef(input));
    directive.onBlur();

    expect(input.value).toBe('HENRIQUE');
  });

  it('should safely handle an empty value', () => {
    const input = document.createElement('input');
    input.value = '';

    const directive = new InputFormat(new ElementRef(input));
    directive.onBlur();

    expect(input.value).toBe('');
  });
});
