import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

import * as fromModule from '../hero.store';
import * as heroActions from '../actions/heroes.actions';
import { HeroService } from './../services/hero.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroesEffects {

  // Busca array de heróis

  @Effect()
  public getHeroes$: Observable<Action> = this.actions$
    .ofType(heroActions.GET_HEROES)
    .map(action => action['payload'])
    .switchMap((payload) => this.service.getHeroes()
      .map((result) => new heroActions.GetHeroesSuccess(result))
      .catch((error) => of(new heroActions.HeroesError(error)))
    );

  @Effect({ dispatch: false })
  public getHeroesSuccess$: Observable<Action> = this.actions$
    .ofType(heroActions.GET_HEROES_SUCCESS);

  // Busca herói pelo id

  @Effect()
  public getHeroById$: Observable<Action> = this.actions$
    .ofType(heroActions.GET_HERO)
    .map(action => action['payload'])
    .switchMap((payload) => this.service.getHero(payload)
      .map((result) => new heroActions.GetHeroByIdSuccess(result))
      .catch((error) => of(new heroActions.HeroesError(error)))
    );

  @Effect({ dispatch: false })
  public getHeroByIdSuccess$: Observable<Action> = this.actions$
    .ofType(heroActions.GET_HERO_SUCCESS);

  // Cria herói e vai para a lista

  @Effect()
  public addHeroes$: Observable<Action> = this.actions$
    .ofType(heroActions.ADD_HEROES)
    .map(action => action['payload'])
    .switchMap((payload) => this.service.addHero(payload)
      .map((result) => new heroActions.AddHeroesSuccess(result))
      .catch((error) => of(new heroActions.HeroesError(error)))
    );

  @Effect({ dispatch: false })
  public addHeroesSuccess$: Observable<Action> = this.actions$
    .ofType(heroActions.ADD_HEROES_SUCCESS)
    .do(() => this.location.back());

  // Faz update do herói e vai para a lista

  @Effect()
  public editHeroes$: Observable<Action> = this.actions$
    .ofType(heroActions.EDIT_HEROES)
    .map(action => action['payload'])
    .switchMap((payload) => this.service.updateHero(payload)
      .map((result) => new heroActions.EditHeroesSuccess(result))
      .catch((error) => of(new heroActions.HeroesError(error)))
    );

  @Effect({ dispatch: false })
  public editHeroesSuccess$: Observable<Action> = this.actions$
    .ofType(heroActions.EDIT_HEROES_SUCCESS)
    .do(() => this.location.back());

  // Apaga herói

  @Effect()
  public deleteHeroes$: Observable<Action> = this.actions$
    .ofType(heroActions.REMOVE_HEROES)
    .map(action => action['payload'])
    .switchMap((payload) => this.service.deleteHero(payload)
      .map((result) => new heroActions.RemoveHeroesSuccess(payload))
      .catch((error) => of(new heroActions.HeroesError(error)))
    );

  @Effect({ dispatch: false })
  public deleteHeroesSuccess$: Observable<Action> = this.actions$
    .ofType(heroActions.REMOVE_HEROES_SUCCESS);

  // Erros efeitos

  @Effect({ dispatch: false })
  public heroesError$: Observable<Action> = this.actions$
    .ofType(heroActions.HEROES_ERROR);

  constructor(
    private actions$: Actions,
    private location: Location,
    private service: HeroService,
    private store$: Store<fromModule.AppState>
  ) { }
}
