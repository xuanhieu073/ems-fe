import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideMoreHorizontal } from '@ng-icons/lucide';
import {
  HlmButtonDirective,
  HlmButtonModule,
} from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmIconComponent } from '../../../ui-icon-helm/src/lib/hlm-icon.component';
import { HlmMenuGroupComponent } from '../../../ui-menu-helm/src/lib/hlm-menu-group.component';
import { HlmMenuLabelComponent } from '../../../ui-menu-helm/src/lib/hlm-menu-label.component';
import { HlmMenuSeparatorComponent } from '../../../ui-menu-helm/src/lib/hlm-menu-separator.component';
import { HlmMenuComponent } from '../../../ui-menu-helm/src/lib/hlm-menu.component';
import { AuthStore } from '../store/auth.store';

@Component({
  standalone: true,
  selector: 'app-header-nav',
  providers: [
    provideIcons({
      lucideMoreHorizontal,
    }),
  ],
  imports: [
    RouterModule,
    HlmMenuGroupComponent,
    HlmMenuComponent,
    HlmIconComponent,
    BrnMenuTriggerDirective,
    HlmButtonDirective,
  ],
  template: `
    <nav
      class="flex justify-between items-center px-10 py-3 max-w-[1200px] mx-auto"
    >
      <img
        src="assets/images/commerce/logo.svg"
        width="{172}"
        height="{52}"
        alt="logo"
      />
      <ul class="flex gap-x-4 navbar-nav">
        <li
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-[#324d67] text-sm leading-6 tracking-widest"
        >
          <a [routerLink]="['/']">Home</a>
          <div class="opacity-0 w-full h-[2px] bg-[#ab7a5f]"></div>
        </li>
        <li
          routerLinkActive="active"
          class="text-[#324d67] text-sm leading-6 tracking-widest nav-item"
        >
          <a [routerLink]="['/about']">About</a>
          <div class="opacity-0 w-full h-[2px] bg-[#ab7a5f] nav-link"></div>
        </li>
        <li
          routerLinkActive="active"
          class="text-[#324d67] text-sm leading-6 tracking-widest"
        >
          <a [routerLink]="['/products']">Products</a>
          <div class="opacity-0 w-full h-[2px] bg-[#ab7a5f]"></div>
        </li>
      </ul>
      <div class="flex gap-4 items-center">
        <div class="flex items-center gap-x-2 cursor-pointer" routerLink="/cart">
          <p class="text-xl">Cart</p>
          <img
            src="/assets/images/commerce/cart.svg"
            width="{24}"
            height="{24}"
            alt="cart"
          />
        </div>
        @if(isAuthenticated()) {
        <div>{{ user()?.username }}</div>
        <button
          hlmBtn
          variant="ghost"
          class="h-6 w-6 p-0.5"
          align="end"
          [brnMenuTriggerFor]="menu"
        >
          <hlm-icon class="w-4 h-4" name="lucideMoreHorizontal" />
        </button>
        <ng-template #menu>
          <hlm-menu>
            @if(user()?.roles?.includes('ROLE_ADMIN')) {
              <hlm-menu-group>
                <button hlmMenuItem routerLink="/dashboard/products">dashboard</button>
              </hlm-menu-group>
            }
            <hlm-menu-group>
              <button hlmMenuItem (click)="logout()">Logout</button>
            </hlm-menu-group>
          </hlm-menu>
        </ng-template>
        } @else {
        <a routerLink="/login" class="flex items-center gap-x-2">
          <p class="text-xl">Login</p>
          <img
            src="/assets/images/commerce/login.svg"
            width="{24}"
            height="{24}"
            alt="login"
          />
        </a>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      .active {
        div {
          @apply opacity-100;
        }
      }
    `,
  ],
})
export class HeaderNavComponent {
  authStore = inject(AuthStore);
  isAuthenticated = toSignal(this.authStore.isAuthenticated$);
  user = toSignal(this.authStore.user$);

  logout() {
    this.authStore.logoutEffect();
  }
}
