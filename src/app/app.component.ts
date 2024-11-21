import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { ProductListComponent } from './products/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterOutlet,
  ],
  template: ` <router-outlet /> `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ems-fe';
}
