import {Component, OnDestroy, OnInit, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";

import {DataStorageService} from "../../core/services/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() back = new EventEmitter<any>()

  isAuthenticated: boolean = false
  private userSub: Subscription

  constructor(
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user
        console.log(user)
        console.log(!user)
        console.log(!!user)
      }
    )
  }
  logOut(){
    this.authService.logOut()
  }
  onSave() {
    this.dataService.setDataRecipes();
  }


  onFetchData() {
    this.dataService.fetchDataRecips().subscribe()
    this.router.navigate(['recipes'], {relativeTo: this.route})
    this.dataService.fetchDataRecips()
      .subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
