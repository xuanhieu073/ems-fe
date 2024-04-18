import { Component, input } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-square-button',
  template: `<button class="w-6 h-6 rounded-md border border-black" [class.bg-black]="active()"></button>`
})
export class SquareButtonComponent {
  active = input.required<boolean>();
}