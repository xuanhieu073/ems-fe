import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-breadcrumb',
  template: `
    <div class="py-20 bg-[#eaded7] mb-16">
      <div class="container">
        <p class="text-[#453227] font-bold text-3xl">
          <span class="text-[#795744]">Home</span> / {{ url() }}
        </p>
      </div>
    </div>
  `,
})
export class BreadcrumbComponent {
  private router = inject(Router);

  url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as { url: string }).url),
      map((url) => url.split('?')[0]),
      map((url) => url.substring(1, url.length)),
      tap((data) => {})
    )
  );
}
