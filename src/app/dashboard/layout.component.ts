import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AuthStore } from '../store/auth.store';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HlmButtonDirective,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
  ],
  template: `
    <div class="flex">
      <div class="w-[200px] h-screen border-r">
        <div>
          <div class="h-14 space-y-1 border-b flex items-center justify-center">
            <h4 class="text-sm font-medium leading-none">Dashbard</h4>
          </div>
          <div class="flex flex-col items-center h-5 text-sm space-y-2 pt-2">
            <div
              class="cursor-pointer"
              routerLink="/dashboard/products"
              routerLinkActive="font-bold"
            >
              Products
            </div>
            <brn-separator hlmSeparator />
            <div
              class="cursor-pointer"
              routerLink="/dashboard/users"
              routerLinkActive="font-bold"
            >
              Users
            </div>
            <brn-separator hlmSeparator />
            <div>Source</div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <nav class="px-6 h-14 flex items-center justify-end w-full border-b">
          <button type="submit" hlmBtn (click)="logout()">Logout</button>
        </nav>
        <router-outlet />
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  authStore = inject(AuthStore);
  logout() {
    this.authStore.setAccessToken({ accessToken: '' });
  }
}
