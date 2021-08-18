import { Component } from "@angular/core";
import { DataStorageServiseService } from "../shared/data-storage-servise.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  constructor(private dataService: DataStorageServiseService) {}

  onSave() {
    this.dataService.setDataRecipes();
  }
  onFetchData(){
    this.dataService.fetchDataRecips().subscribe()
  }
}
