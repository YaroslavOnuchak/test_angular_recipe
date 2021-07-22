import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-resipe-edit',
  templateUrl: './resipe-edit.component.html',
  styleUrls: ['./resipe-edit.component.scss']
})
export class ResipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  id: number
  editMode = false

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
      }
    )
  }

}
