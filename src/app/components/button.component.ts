import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  template: `
    <button
      class="bg-[#ab7a5f] text-sm rounded shadow-md text-teal-200 transition-colors duration-500 hover:bg-green-300 hover:text-gray-600"
      [class]="size() === 'sm' ? 'px-3 py-[6px]' : 'px-6 py-[12px]'"
    >
      {{ text() }}
    </button>
  `,
})
export class ButtonComponent {
  text = input.required();
  size = input('');
}
