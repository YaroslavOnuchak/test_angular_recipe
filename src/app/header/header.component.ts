import { Component, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { DataStorageServiseService } from "../shared/data-storage-servise.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
 @Output() back = new  EventEmitter<any>()
  constructor(
    private dataService: DataStorageServiseService,
    private router :Router,
    private  route:ActivatedRoute
  ) {}

  onSave() {
    this.dataService.setDataRecipes();
  }

  onFetchData(){
    this.dataService.fetchDataRecips().subscribe()
    this.router.navigate(['recipes'], {relativeTo:  this.route })
    this.dataService.fetchDataRecips()
    .subscribe()
  }
}
