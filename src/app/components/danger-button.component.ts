import { Component, EventEmitter, input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-danger-button',
  template: `<button (click)="onClick()" class="text-xs font-semibold text-white tracking-widest bg-[#bb2525] rounded-md py-1 px-2">{{text()}}</button>`
})
export class DangerButtonComponent {
  text = input.required<string>();
  @Output() buttonClick = new EventEmitter<void>();
  onClick() {
    this.buttonClick.emit();  // Emit the event when the button is clicked
  }
}