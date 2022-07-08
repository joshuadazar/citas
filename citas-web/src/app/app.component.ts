import { Component, ElementRef, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { FiltersService } from './services/filters.service';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { UserProfile } from './models/userProfile';
import { UiService } from './services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('itemInput') itemInput!: ElementRef;
  @ViewChild('byName') checkByName!: ElementRef;
  @ViewChild('byServices') checkByServices!: ElementRef;
  @ViewChild('byPrice') checkByPrice!: ElementRef;

  //Subscriptions
  navbarSubscriptions: Subscription = new Subscription();

  //UI
  public showNavbarState:boolean = true;
  public showFilters: boolean = false;
  public toggleMobileMenu: boolean= false;

  // DATA
  public orderList = {
    highPrice: 'high',
    lowPrice: 'low',
    random: 'random'
  }
  public userAuthenticated: UserProfile | null | undefined | string ={}
  public authName : string | undefined | null = ''
  public authEmail : string | undefined | null = ''


  public filterCriteriaOptions = {
    name: 'name',
    services: 'services',
    price:'price'
  }

  public filterCriteria: string | number = this.filterCriteriaOptions.name;

  constructor(
    private filtersService: FiltersService,
    private router: Router,
    private renderer: Renderer2,
    private auth: AuthService,
    private ui$: UiService) { }

  ngOnInit(): void {
    //this.filtersService.setfilterItem('name')
    this.validateUserLogged();
    this.watchNavbar()
  }


  validateUserLogged() {
     this.authEmail = sessionStorage.getItem('email') == null ? '' : sessionStorage.getItem('email')
     this.authName = sessionStorage.getItem('name') == null ? '' : sessionStorage.getItem('name')
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
    this.itemInput.nativeElement.value = ""
    this.searchItem(['']);
  }

  //Auth
  loginWithGoogle() {
    this.auth.loginWithGoogle().then(res => {
      if (res !== undefined || res !==null) {

        this.userAuthenticated= res?.additionalUserInfo?.profile
        this.authName = this.userAuthenticated?.name
        this.authEmail = this.userAuthenticated?.email
        sessionStorage.setItem('name', this.userAuthenticated?.name!);
        sessionStorage.setItem('email', this.userAuthenticated?.email!);
        sessionStorage.setItem('userLogged', 'true');
      }
    })
  }

  logOutUser() {
    this.router.navigateByUrl('/lucky')
    sessionStorage.clear();
    this.validateUserLogged()
  }

  // watchers
  watchNavbar() {
    this.navbarSubscriptions = this.ui$.watchlshowSearchBar().subscribe((status:boolean)=> {
      this.showNavbarState = status
    })
  }

  ngOnDestroy(): void {
      this.navbarSubscriptions.unsubscribe()
  }


}
