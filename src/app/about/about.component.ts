import { Component } from '@angular/core';
import { OurStoryComponent } from './our-story.component';
import { HeaderNavComponent } from '../components/header-nav.component';
import { BreadcrumbComponent } from '../components/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'about',
  template: `
    <app-header-nav />
    <app-breadcrumb />
    <about-our-story />
  `,
  imports: [OurStoryComponent, HeaderNavComponent, BreadcrumbComponent],
})
export class About {}
