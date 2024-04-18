import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-breadcrumb",
  template: `
  <div class="py-20 bg-[#eaded7] mb-16">
    <div class="container">
      <p class="text-[#453227] font-bold text-3xl"><span class="text-[#795744]">Home</span> / Products</p>
    </div>
  </div>
  `
})
export class BreadcrumbComponent {}