import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { ItemsComponent } from './components/items/items.component';
import { PanelItemsComponent } from './components/panel-items/panel-items.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/lucky',
    pathMatch: 'full'
  },
  { path: 'lucky', component: ItemsComponent },
  { path: 'itemDetail', component: DetailItemComponent },
  { path: 'panelItems', component: PanelItemsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
