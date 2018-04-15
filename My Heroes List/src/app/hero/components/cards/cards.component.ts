import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../models/heroe.model';
import { HeroService } from '../../services/hero.service';
import * as Actions from '../../actions/heroes.actions';
import { Store } from '@ngrx/store';
import * as fromModule from '../../hero.store';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class HeroCardComponent {
  private list;

  @Input() array: Hero[];

  constructor(
    private store: Store<fromModule.AppState>,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router
  ) { }

  update(id) {
    this.router.navigate(['../update', id], { relativeTo: this.route });
  }

  delete(id) {
    this.store.dispatch(new Actions.RemoveHeroes(id));
  }
}
