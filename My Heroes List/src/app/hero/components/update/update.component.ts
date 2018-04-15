import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/heroe.model';
import { HeroService } from '../../services/hero.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as Actions from '../../actions/heroes.actions';
import * as fromModule from '../../hero.store';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  hero$: Observable<Hero>;

  constructor(
    private store: Store<fromModule.AppState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.hero$ = this.store.select(fromModule.getHeroDetails);
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.store.dispatch(new Actions.GetHeroById(this.route.snapshot.params['id']));
    }
  }

  save(obj: Hero) {
    this.store.dispatch(new Actions.EditHeroes(obj));
  }
}
