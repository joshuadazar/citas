import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersService } from 'src/app/services/filters.service';
import {Items} from '../../models/items';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  orderList: string = '';
  constructor(private filtersService: FiltersService, private router: Router ) { }
  public itemsArr: Array<Items> = this.filtersService.itemsArr;
  public data: any;
  public detailState: boolean= false;

  ngOnInit(): void {
    this.filtersService.watchlistOrder().subscribe(order => {
      this.orderList=order;
      if (order === 'low') {
          this.filtersService.itemsArr.sort((a, b) => {
            return a.price - b.price;
          })
      } if (order=== 'high'){
        this.filtersService.itemsArr.sort((a, b) => {
          return b.price - a.price;
        })
      } if (order=== 'random'){
        for (var i = this.filtersService.itemsArr.length - 1; i > 0; i--) {
          var rand = Math.floor(Math.random() * (i + 1));
          [this.filtersService.itemsArr[i], this.filtersService.itemsArr[rand]] = [this.filtersService.itemsArr[rand], this.filtersService.itemsArr[i]]
        }
      }

    })

    this.filtersService.watchitem().subscribe((item) => {
      this.data= item
    })
  }

  searchItem(name:Items):void {
    this.detailState= true
    this.filtersService.setitem(name)

  }

  // showPaymentDetails() {
  //   this.router.navigate(['/', 'itemDetail']);
  // }

}
