import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/heroe.model';
import { HeroService } from '../../services/hero.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as Actions from '../../actions/heroes.actions';
import * as fromModule from '../../hero.store';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  lista = true;

  constructor(
    private store: Store<fromModule.AppState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.heroes$ = this.store.select(fromModule.getHeroesArray);
  }

  ngOnInit() {
    this.store.dispatch(new Actions.GetHeroes());
  }

  create() {
    this.router.navigate(['../create'], { relativeTo: this.route });
  }

  update(id) {
    this.router.navigate(['../update', id], { relativeTo: this.route });
  }

  delete(id) {
    this.store.dispatch(new Actions.RemoveHeroes(id));
  }

  changeView () {
    this.lista = !this.lista;
    // this.router.navigate(['../cards'], { relativeTo: this.route });
  }

  changeView_list () {
    this.lista = true;
    // this.router.navigate(['../cards'], { relativeTo: this.route });
  }

  changeView_cards () {
    this.lista = false;
    // this.router.navigate(['../cards'], { relativeTo: this.route });
  }
}
