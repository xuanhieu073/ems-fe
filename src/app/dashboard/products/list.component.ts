import { DecimalPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  TrackByFunction,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {
  HlmCheckboxCheckIconComponent,
  HlmCheckboxComponent,
} from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import {
  BrnTableModule,
  PaginatorState,
  useBrnColumnManager,
} from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BehaviorSubject, map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import {
  lucideArrowUpDown,
  lucideChevronDown,
  lucideMoreHorizontal,
  lucidePlus,
} from '@ng-icons/lucide';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from '../../models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductStore } from './list.store';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    FormsModule,

    BrnMenuTriggerDirective,
    HlmMenuModule,

    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    DecimalPipe,
    TitleCasePipe,
    HlmIconComponent,
    HlmInputDirective,

    HlmCheckboxCheckIconComponent,
    HlmCheckboxComponent,

    BrnSelectModule,
    HlmSelectModule,

    RouterLink,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideMoreHorizontal,
      lucideArrowUpDown,
      lucidePlus,
    }),
    ProductStore,
  ],
  template: `
    <div>
      <div class="flex flex-col justify-between gap-4 sm:flex-row">
        <input
          hlmInput
          class="w-full md:w-80"
          placeholder="Filter emails..."
          [ngModel]="_emailFilter()"
          (ngModelChange)="store.updateQuery($event)"
        />
        <div class="flex gap-x-2 items-center">
          <button hlmBtn routerLink="create">
            <hlm-icon size="sm" name="lucidePlus"></hlm-icon>
          </button>
          <button
            hlmBtn
            variant="outline"
            align="end"
            [brnMenuTriggerFor]="menu"
          >
            Columns
            <hlm-icon name="lucideChevronDown" class="ml-2" size="sm" />
          </button>
          <ng-template #menu>
            <hlm-menu class="w-32">
              @for (column of _brnColumnManager.allColumns; track column.name) {
              <button
                hlmMenuItemCheckbox
                [disabled]="_brnColumnManager.isColumnDisabled(column.name)"
                [checked]="_brnColumnManager.isColumnVisible(column.name)"
                (triggered)="_brnColumnManager.toggleVisibility(column.name)"
              >
                <hlm-menu-item-check />
                <span>{{ column.label }}</span>
              </button>
              }
            </hlm-menu>
          </ng-template>
        </div>
      </div>
      <brn-table
        hlm
        stickyHeader
        class="border-border mt-4 block overflow-auto rounded-md border"
        [dataSource]="store.products()"
        [displayedColumns]="_allDisplayedColumns()"
        [trackBy]="_trackBy"
      >
        <brn-column-def name="select" class="w-12">
          <hlm-th *brnHeaderDef>
            <hlm-checkbox
              [checked]="_checkboxState()"
              (changed)="handleHeaderCheckboxChange()"
            />
          </hlm-th>
          <hlm-td *brnCellDef="let element">
            <hlm-checkbox
              [checked]="_isPaymentSelected(element)"
              (changed)="togglePayment(element)"
            />
          </hlm-td>
        </brn-column-def>
        <brn-column-def name="name" class="w-32 sm:flex-1">
          <hlm-th truncate *brnHeaderDef>Name</hlm-th>
          <hlm-td truncate *brnCellDef="let element">
            {{ element.name | titlecase }}
          </hlm-td>
        </brn-column-def>
        <brn-column-def name="description" class="w-32 sm:flex-1">
          <hlm-th truncate *brnHeaderDef>Description</hlm-th>
          <hlm-td truncate *brnCellDef="let element">
            {{ element.description }}
          </hlm-td>
        </brn-column-def>
        <brn-column-def name="price" class="w-36">
          <hlm-th *brnHeaderDef>Price</hlm-th>
          <hlm-td class="font-medium tabular-nums" *brnCellDef="let element">
            $ {{ element.price | number : '1.2-2' }}
          </hlm-td>
        </brn-column-def>
        <brn-column-def name="actions" class="w-16">
          <hlm-th *brnHeaderDef></hlm-th>
          <hlm-td *brnCellDef="let element">
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
                <hlm-menu-label>Actions</hlm-menu-label>
                <hlm-menu-separator />
                <hlm-menu-group>
                  <button hlmMenuItem [routerLink]="['details', element.id]">
                    Edit
                  </button>
                </hlm-menu-group>
                <hlm-menu-group>
                  <button hlmMenuItem>Dedlete</button>
                </hlm-menu-group>
              </hlm-menu>
            </ng-template>
          </hlm-td>
        </brn-column-def>
        <div
          class="flex items-center justify-center p-20 text-muted-foreground"
          brnNoDataRow
        >
          No data
        </div>
      </brn-table>
      <div
        class="flex flex-col justify-between mt-4 sm:flex-row sm:items-center"
        *brnPaginator="
          let ctx;
          totalElements: _totalElements();
          pageSize: _pageSize();
          onStateChange: _onStateChange
        "
      >
        <span class="text-sm text-muted-foreground"
          >{{ _selected().length }} of {{ _totalElements() }} row(s)
          selected</span
        >
        <div class="hidden mt-2 sm:mt-0">
          <brn-select
            class="inline-block"
            placeholder="{{ _availablePageSizes[0] }}"
            [(ngModel)]="_pageSize"
          >
            <hlm-select-trigger class="inline-flex mr-1 w-15 h-9">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              @for (size of _availablePageSizes; track size) {
              <hlm-option [value]="size">
                {{ size === 10000 ? 'All' : size }}
              </hlm-option>
              }
            </hlm-select-content>
          </brn-select>
          <div class="flex space-x-1">
            <button
              size="sm"
              variant="outline"
              hlmBtn
              [disabled]="!ctx.decrementable()"
              (click)="ctx.decrement()"
            >
              Previous
            </button>
            <button
              size="sm"
              variant="outline"
              hlmBtn
              [disabled]="!ctx.incrementable()"
              (click)="ctx.increment()"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardProductListComponent implements OnInit {
  productService = inject(ProductService);

  protected readonly _emailFilter = signal('');
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);
  private readonly _selectionModel = new SelectionModel<Product>(true);

  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(
      map((change) => {
        return change.source.selected;
      })
    ),
    {
      initialValue: [],
    }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    name: { visible: true, label: 'Name' },
    description: { visible: true, label: 'Description' },
    price: { visible: true, label: 'Price ($)' },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  protected readonly _trackBy: TrackByFunction<any> = (_: number, p: any) =>
    p.id;

  protected readonly _allProductsSelected = computed(() =>
    this.store.products().every((product) => this._selected().includes(product))
  );

  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allProductsSelected()
      ? true
      : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this.store.products());
    } else {
      this._selectionModel.deselect(...this.store.products());
    }
  }
  protected readonly _isPaymentSelected = (product: any) =>
    this._selectionModel.isSelected(product);

  protected togglePayment(product: any) {
    this._selectionModel.toggle(product);
  }

  protected handleEmailSortChange() {
    // const sort = this._emailSort();
    // if (sort === 'ASC') {
    //   this._emailSort.set('DESC');
    // } else if (sort === 'DESC') {
    //   this._emailSort.set(null);
    // } else {
    //   this._emailSort.set('ASC');
    // }
  }

  protected readonly _totalElements = computed(() => 10);
  // () => this._filteredPayments().length

  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) => 1;
  // this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    // effect(() => this._emailFilter.set(this._debouncedFilter() ?? ''), {
    //   allowSignalWrites: true,
    // });
  }

  readonly store = inject(ProductStore);

  ngOnInit(): void {
    const query = this.store.filter.query;
    this.store.loadByQuery(query);
  }
}
