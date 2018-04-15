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
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private store: Store<fromModule.AppState>) {
  }

  save(obj: Hero) {
    this.store.dispatch(new Actions.AddHeroes(obj));
  }
}
