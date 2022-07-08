import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  private showSearchBar = new Subject<boolean>();


  watchlshowSearchBar(): Observable<boolean> {
    return this.showSearchBar.asObservable();
  }
  setShowSearchBar(status: boolean) {
    this.showSearchBar.next(status);
  }
}
