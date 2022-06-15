import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FiltersService } from './services/filters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('itemInput') itemInput!: ElementRef;
  @ViewChild('byName') checkByName!: ElementRef;
  @ViewChild('byServices') checkByServices!: ElementRef;
  @ViewChild('byPrice') checkByPrice!: ElementRef;

  public showFilters: boolean = false;
  public orderList = {
    highPrice: 'high',
    lowPrice: 'low',
    random: 'random'
  }

  public filterCriteriaOptions = {
    name: 'name',
    services: 'services',
    price:'price'
  }

  public filterCriteria: string | number = this.filterCriteriaOptions.name;

  constructor(
    private filtersService: FiltersService,
    private router: Router,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    //this.filtersService.setfilterItem('name')

  }

  showExpensives(order: string): void {
    this.filtersService.setListOrder(order)
  }

  searchItem(item: any[]): void {
    item.push(this.filterCriteria)
    if(item[0].length > 0) this.showFilters = true;
    if(item[0].length>2){
      this.filtersService.setSearchItem(item)
      this.showFilters = true;
    }
    if(item[0].length==0) {
      this.filtersService.setSearchItem(item)
    }
  }



  setFilterCriteria(filterSelected: string ) {
    this.filterCriteria= filterSelected
    this.itemInput.nativeElement.value=""
    this.searchItem(['']);
  }


}
