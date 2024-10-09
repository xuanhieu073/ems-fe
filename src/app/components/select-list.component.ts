import {
  Component,
  computed,
  input,
  Input,
  model,
  signal,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-select-list',
  template: `
    <div class="flex flex-col gap-2">
      <p
        class="text-sm text-[#617d98] cursor-pointer"
        [class.underline]="!selectedCategoryId()"
        (click)="selectedCategoryId.set(undefined)"
      >
        All
      </p>
      @for(category of categories(); track category.id) {
      <p
        class="text-sm text-[#617d98] cursor-pointer"
        [class.underline]="category.id === selectedCategoryId()"
        (click)="selectedCategoryId.set(category.id)"
      >
        {{ category.name }}
      </p>
      }
    </div>
  `,
})
export class SelectListComponent {
  categories = input.required<any[]>();
  selectedCategoryId = model<number | undefined>(undefined);
  // selectedCategoryId = signal<number | undefined>(undefined);
  selectedCategory = computed(() =>
    this.categories().find(
      (category) => category.id === this.selectedCategoryId()
    )
  );
}
