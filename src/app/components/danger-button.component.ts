import { Component, input } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-danger-button',
  template: `<button class="text-xs font-semibold text-white tracking-widest bg-[#bb2525] rounded-md py-1 px-2">{{text()}}</button>`
})
export class DangerButtonComponent {
  text = input.required<string>()
}