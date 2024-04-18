import { Component } from '@angular/core';
import { HeaderNavComponent } from '../components/header-nav.component';
import { HeroComponent } from './hero.component';
import { FeaturedProductsComponent } from './featured-products.component';
import { ArticlesComponent } from './articles.component';
import { ReachOutFormComponent } from './reach-out-form.component';

@Component({
  standalone: true,
  selector: 'home',
  template: `
    <app-header-nav />
    <home-hero />
    <home-featured-products />
    <home-articles />
    <home-reach-out-form />
  `,
  imports: [
    HeaderNavComponent,
    HeroComponent,
    FeaturedProductsComponent,
    ArticlesComponent,
    ReachOutFormComponent,
  ],
})
export class HomeComponent {}
