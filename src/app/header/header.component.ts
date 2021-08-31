import { Component, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { DataStorageServiseService } from "../shared/data-storage-servise.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
 @Output() back = new  EventEmitter<any>()
  constructor(
    private dataService: DataStorageServiseService) {}

  onSave() {
    this.dataService.setDataRecipes();
  }
  
  onFetchData(){
    this.dataService.fetchDataRecips()
    .subscribe()
  }
}
