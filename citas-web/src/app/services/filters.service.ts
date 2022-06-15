import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Items } from '../models/items';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  constructor(private itemData: AngularFirestore) { }
  private listOrder = new Subject<string>();


  watchlistOrder(): Observable<string> {
    return this.listOrder.asObservable();
  }
  setListOrder(status: string) {
    this.listOrder.next(status);
  }

  private item = new Subject<Items>();

  watchitem(): Observable<Items> {
    return this.item.asObservable();
  }
  setitem(status: Items) {
    this.item.next(status);
  }

  // searchItem

  private searchItem = new Subject<any[]>();

  watchSearchItem(): Observable<any[]> {
    return this.searchItem.asObservable();
  }
  setSearchItem(itemSearch: any[]) {
    this.searchItem.next(itemSearch);
  }



  // Cache

  public itemsArr: Array<Items> = [
    {
      name: 'Juliana Cumloader',
      price: 160000,
      services: ' 69 | 72 | 3platos | la saca yucas',
      image: 'https://img2.xnostars.com/actriz-bsq/scarlett-cumlouder.jpg',
    },
    {
      name: 'Andreina Deluxe',
      price: 280000,
      services: ' 69 | 72 | 3platos | la saca yucas | salto del delfín | la ablanda nueces | el roca babosa',
      image: 'https://img2.xnostars.com/actriz-bsq/andreina-de-luxe.jpg',
    },
    {
      name: 'Anastasia Rey',
      price: 190000,
      services: ' Reloj de arena | la tatacoa | 3platos | lluvia de otoño',
      image: 'https://img2.xnostars.com/actriz-bsq/anastasia-rey.jpg',
    },
    {
      name: 'Mey Bala',
      price: 180000,
      services: '69 | 72 | 3platos | chupadera | La tejedora espesa',
      image: 'https://img2.xnostars.com/actriz-bsq/mey-bala.jpg',
    },

  ]

  getItemDB() {
    return this.itemData.collection('items').valueChanges();
  }
}
