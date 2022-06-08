import { Component } from '@angular/core';
import { FiltersService } from './services/filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public showFilters: boolean = false;
  public orderList = {
    highPrice: 'high',
    lowPrice: 'low',
    random: 'random'
  }

  constructor(private filtersService: FiltersService) { }

  showExpensives(order: string): void {
    this.filtersService.setListOrder(order)
  }
}
