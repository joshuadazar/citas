import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FiltersService } from 'src/app/services/filters.service';
import {Items} from '../../models/items';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  orderList: string = '';
  constructor(
    private filtersService: FiltersService,
    private router: Router,
    private param: ActivatedRoute ) { }

  public itemsArr: Array<Items> = [];
  public itemsArrCache: Array<Items> = [];
  public dataParam: any;
  public detailState: boolean= false;
  private itemsSubscription$: Subscription = new Subscription();
  public filterCriteria: string ='';
  ngOnInit(): void {

    this.itemsSubscription$= this.filtersService.getItemDB().subscribe((items: any) => {
      try {
        items.length==0 ? this.itemsArr = this.filtersService.itemsArr :
        this.itemsArr= items
        this.itemsArrCache = items

      } catch (error) {
        console.log(error);
        this.itemsArr = this.filtersService.itemsArr
      }
    })


    this.filtersService.watchlistOrder().subscribe(order => {
      this.orderList=order;
      if (order === 'low') {
        this.itemsArr.sort((a, b) => {
          return a.price - b.price;
        })
      } if (order=== 'high'){
        this.itemsArr.sort((a, b) => {
          return b.price - a.price;
        })
      } if (order=== 'random'){
        for (var i = this.itemsArr.length - 1; i > 0; i--) {
          var rand = Math.floor(Math.random() * (i + 1));
          [this.itemsArr[i], this.itemsArr[rand]] = [this.itemsArr[rand], this.itemsArr[i]]
        }
      }

    })

    this.filtersService.watchitem().subscribe((item) => {
      this.dataParam= item
    })

    this.findItem();
  }



  findItem() {

    this.filtersService.watchSearchItem().subscribe((param:any[]) => {
      this.itemsArr= this.itemsArrCache
      console.log(param);
      if(param[1]== 'name')this.itemsArr= this.itemsArr
        .filter((item: Items)=> item.name.toLowerCase().indexOf(param[0]) > -1);
      if(param[1]== 'services')this.itemsArr= this.itemsArr
        .filter((item: Items)=> item.services.toLowerCase().indexOf(param[0]) > -1);
      if(param[1]== 'price')this.itemsArr= this.itemsArr
        .sort((a, b) => b.price - a.price)
        .filter((item: Items)=> item.price <= param[0]);
    })
  }

  showDetailsItem(name:Items):void {
    this.detailState= true
    this.filtersService.setitem(name)

  }

  ngOnDestroy(): void {
      this.itemsSubscription$.unsubscribe();
  }

  // showPaymentDetails() {
  //   this.router.navigate(['/', 'itemDetail']);
  // }

}
