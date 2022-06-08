import { Component, OnInit } from '@angular/core';
import { Items } from 'src/app/models/items';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {

  constructor(private filtersService: FiltersService) { }

  public itemDetails: Items = {
    name: 'User Name',
    price: 0,
    services: 'Loading',
    image:'https://mir-s3-cdn-cf.behance.net/projects/404/c51bfa66111313.Y3JvcCw3MTYsNTYwLDEyOTAsMjI0.png'
  }

  ngOnInit(): void {
    this.filtersService.watchitem().subscribe(item => {
      this.itemDetails = item
      console.log(this.itemDetails);
    })
  }


}
