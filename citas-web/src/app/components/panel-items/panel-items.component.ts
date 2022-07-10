import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/models/item-service';
import { FiltersService } from 'src/app/services/filters.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-panel-items',
  templateUrl: './panel-items.component.html',
  styleUrls: ['./panel-items.component.scss']
})
export class PanelItemsComponent implements OnInit, OnDestroy {

  //Subscription

  public itemServices$ : Subscription = new Subscription();

  //Form
  public itemForm!: FormGroup;
  public _showItemServicesState: boolean = false;

  //DATA
  public itemServicesArr : Array<ItemService> = []
  public itemServicesSelected : Array<ItemService> = []
  public itemServicesToString : string = ''


  constructor(private ui$: UiService, private fb: FormBuilder, private db :FiltersService) {
    this.ui$.setShowSearchBar(false);
    this.createForm();
   }

  ngOnInit(): void {

  }

  createForm(): void {
    let serviceSelected : Array<any> =[]
    this.itemForm = this.fb.group({
      name: [''],
      cel: [''],
      price: [0],
      services: [''],
      image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH4d1ldfiI0npUaDbUXnRHjumUJmSpIaKErA&usqp=CAU'],
      description: ['']
    })
  }

  setServicesToString() {
    this.itemServicesToString = this.itemServicesSelected.map((service:any)=> service.name ).join('| ')
    console.log(this.itemServicesToString);
    if(this.itemServicesToString !=='') {
      this.itemForm.controls['services'].setValue(this.itemServicesToString)
    }
  }

  setItemService(service: ItemService): void {
    if (this.itemServicesSelected.some(s => s.name === service.name)) {
      this.itemServicesSelected = this.itemServicesSelected
      .filter(item => item.name !== service.name)
    } else {
      this.itemServicesSelected.push(service)
    }
  }

  validateItemServiceSelected(service:any): any {
    return this.itemServicesSelected.some(s => s.name === service.name)
  }

  //Database
  createNewItem() {
    console.log(this.itemForm.value);
    this.db.saveItemDB(this.itemForm.value)
    .then(result => console.log(result, 'succesfully saved'))
    .catch(err => console.log(err, 'Error'))
  }

  getAllItemServices(){
    this.itemServices$ = this.db.getAllItemServices().subscribe((result:any)=> {
      try {
        this.itemServicesArr = result
      } catch (error) {
        console.log(error);
      }
    })
  }

  showItemServices() {
    this._showItemServicesState = !this._showItemServicesState
    this._showItemServicesState &&
    this.getAllItemServices();
    this.setServicesToString();
  }

  ngOnDestroy(): void {
    this.ui$.setShowSearchBar(true)
    this.itemServices$.unsubscribe()
  }


}
