import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AuthStore } from '../store/auth.store';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { Location } from '@angular/common';
import { HlmToasterComponent } from '../../../ui-sonner-helm/src/lib/hlm-toaster.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HlmButtonDirective,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
    HlmIconComponent,
    HlmToasterComponent,
  ],
  providers: [provideIcons({ lucideChevronLeft })],
  template: `
    <div class="flex">
      <div class="w-[200px] h-screen border-r">
        <!-- <div>
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
            <div
              class="cursor-pointer"
              routerLink="/dashboard/seed"
              routerLinkActive="font-bold"
            >
              Seed
            </div>
          </div>
        </div> -->
        <div class="space-y-4 py-4">
          <div class="px-3 py-2">
            <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div class="space-y-1">
              <button
                routerLink="/dashboard/products"
                routerLinkActive="bg-zinc-100"
                variant="ghost"
                class="w-full justify-start"
                hlmBtn
              >
                Products
              </button>
              <button
                routerLink="/dashboard/users"
                routerLinkActive="bg-zinc-100"
                variant="ghost"
                class="w-full justify-start"
                hlmBtn
              >
                Users
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <nav
          class="px-6 h-14 flex items-center justify-between w-full border-b"
        >
          <button variant="ghost" hlmBtn (click)="goBack()">
            <hlm-icon size="sm" name="lucideChevronLeft" />
          </button>
          <button type="submit" hlmBtn (click)="logout()">Logout</button>
        </nav>
        <div class="p-6 relative">
          <router-outlet />
        </div>
      </div>
    </div>
    <hlm-toaster />
  `,
})
export class DashboardLayoutComponent {
  authStore = inject(AuthStore);
  location = inject(Location);
  goBack() {
    this.location.back();
  }
  logout() {
    this.authStore.logoutEffect();
  }
}
