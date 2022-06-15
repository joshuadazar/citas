import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Items } from 'src/app/models/items';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit, OnDestroy {

  constructor(private filtersService: FiltersService, private itemParam: ActivatedRoute) { }

  public itemDetails: any = {

  }

  ngOnInit() {
    this.itemParam.params.subscribe((param) => {
      console.log(param);
      this.itemDetails = param;
    })
  }

  ngOnDestroy(): void {
   //this.itemSubscription.unsubscribe();
  }


}
