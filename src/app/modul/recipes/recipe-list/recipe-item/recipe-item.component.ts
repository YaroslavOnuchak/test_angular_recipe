import {Component, OnInit, Input, EventEmitter, Output, AfterViewInit} from '@angular/core';

import {Recipe} from '../../../../shared/recipe.model';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  animations: [
    trigger('list1', [
        state('in',
          style({
            background: 'inherit',
            borderRadius: '5px',
            transform: 'translateX(0)',
            opacity: '1'
          })),
        transition(
          'void=>*', [
            style({
              transform: 'translateX(-200px)',
              opacity: '0',
              background: '#10fa06',
              // padding: '50px ',
              borderRadius: '50%',
            }),
            animate(1500)]
        ),
        transition(
          '* => void', [
            animate(1500, style({
              transform: 'translateX(100px)',
              opacity: '0'
            }))]
        )
      ]
    ), trigger('click1', [
        state('normal',
          style({
              // background: 'inherit',
              // borderRadius: '5px',
              // transform: 'translateX(0)',
              opacity: '1'
            }
          )
        ),
        state('animated',
          style({
              // background: 'inherit',
              borderRadius: '5px',
              // transform: 'translateX(0)',
              opacity: '1'
            }
          )
        ),
        transition(
          'normal<=>animated', [
            animate(1500, keyframes([
                  style({
                      // transform: 'translateX(-200px)',
                      opacity: '0.1',
                      background: 'rgb(2,0,36)',
                      backgroundImage: `linear-gradient(38deg, rgba(28,16,230,1) 0%,
                rgba(75,14,69,1) 21%,
                rgba(21,121,9,1) 34%,
                rgba(25,182,144,0.7346288857339811) 46%,
                rgba(0,212,255,1) 59%, rgba(255,0,198,1) 77%,
                rgba(255,252,0,1) 89%)`,
                      // borderRadius: '50%',
                      // offset: 0
                    }
                  ), style({
                      // transform: 'translateX(-200px)',
                      opacity: '0.5',
                      background: 'rgb(2,0,36)',
                      backgroundImage: `linear-gradient(77deg, rgba(28,16,230,1) 0%,
                rgba(75,14,69,1) 21%,
                rgba(21,121,9,1) 34%,
                rgba(25,182,144,0.7346288857339811) 46%,
                rgba(0,212,255,1) 59%, rgba(255,0,198,1) 77%,
                rgba(255,252,0,1) 89%)`,
                      // borderRadius: '50%',
                      // offset: 0.5
                    }
                  ),
                ]
              )
            ),
          ]
        )
      ]
    )
  ],
  selector: 'app-recipe-item',
  host: {
    '[@list1]': 'true'
  },
  template: `<a
    class="list-group-item clearfix d-flex justify-content-between align-items-center"
    style="cursor: pointer"
    [routerLink]="[index]"
    routerLinkActive="active"
    [@click1]="click_1"
    (click)="click()"

  >
    <div class="pull-left" style="width: 70%;" [@list1]>
      <h4 class="list-group-item-heading">{{ recipe.name }} _{{index}}</h4>
      <p
        class="list-group-item-text"
        [style]="{
      'display': '-webkit-box',
       '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '3',
         'overflow': 'hidden'}">{{ recipe.description }}</p>
    </div>
    <img
      [src]="recipe.imagePath"
      alt="{{ recipe.name }}"
      class="img-responsive"
      style="max-height: 80px;
          object-fit: cover;
          border-radius: 1rem;
          aspect-ratio: 1/1;
          filter: drop-shadow(0px 0px 1rem #8B0000FF)">
  </a>`,
  // styleUrls: ['./recipe-item.component.scss']


})
export class RecipeItemComponent implements OnInit, AfterViewInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  transition: number = 1
  click_1 = 'normal';
  test2 = 'test_1';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.transition = this.index * 100
    // this.onAnimate()
  }


  click() {
    // console.log('==> onAnimate')
    this.click_1 === 'animated' ? this.click_1 = 'normal' : this.click_1 = 'animated';
  }
}
