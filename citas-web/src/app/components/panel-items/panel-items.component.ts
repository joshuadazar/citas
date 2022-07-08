import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-panel-items',
  templateUrl: './panel-items.component.html',
  styleUrls: ['./panel-items.component.scss']
})
export class PanelItemsComponent implements OnInit, OnDestroy {

  constructor(private ui$: UiService) {
    this.ui$.setShowSearchBar(false);
   }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
      this.ui$.setShowSearchBar(true)
  }
}
