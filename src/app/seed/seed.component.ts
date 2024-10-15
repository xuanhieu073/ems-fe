import { Component, inject } from '@angular/core';
import { SeedService } from '../services/seed.service';
import { ButtonComponent } from '../components/button.component';
import { faker } from '@faker-js/faker';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-seed',
  template: ` <app-button text="Generate Data" (click)="generateData()" /> `,
  imports: [ButtonComponent],
})
export class SeedComponent {
  private seedService = inject(SeedService);

  generateData() {
    console.log('generate data!');
    const categories = [
      {
        name: 'Garden',
      },
      {
        name: 'Movies',
      },
      {
        name: 'Jewelery',
      },
      {
        name: 'Electronics',
      },
      {
        name: 'Toys',
      },
    ];
    const companies = [
      {
        name: 'networks',
      },
      {
        name: 'methodologies',
      },
      {
        name: 'supply-chains',
      },
      {
        name: 'technologies',
      },
      {
        name: 'e-markets',
      },
    ];
    const colors = [
      {
        name: 'supply-chains',
        hexValue: '#e4ef1a',
      },
      {
        name: 'schemas',
        hexValue: '#cdd5d4',
      },
      {
        name: 'functionalities',
        hexValue: '#fef403',
      },
      {
        name: 'ROI',
        hexValue: '#86a6ae',
      },
      {
        name: 'architectures',
        hexValue: '#efdc3c',
      },
    ];
    const products = Array.from(Array(20).keys()).map((_) => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      rating: (faker.number.int(9) + 1) / 2,
      description: faker.commerce.productDescription(),
      freeShip: Boolean(faker.number.int(1)),
      categoryId: faker.number.int(4) + 1,
      companyId: faker.number.int(4) + 1,
      colorsId: [faker.number.int(4) + 1],
    }));

    const seedCatObs = forkJoin(
      categories.map((category) => this.seedService.seedCategory(category))
    );
    const seedComObs = forkJoin(
      companies.map((company) => this.seedService.seedCompany(company))
    );
    const seedClsObs = forkJoin(
      colors.map((color) => this.seedService.seedColor(color))
    );
    const seedProduct = forkJoin(
      products.map((product) => this.seedService.seedProduct(product))
    );

    // seedCatObs
    // .pipe(
    //   switchMap((catrs) => seedComObs),
    //   switchMap((comrs) => seedClsObs),
    //   switchMap((clsrs) => seedProduct)
    // )
    // seedProduct.subscribe((result) => console.log(result));
  }
}
