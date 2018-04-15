import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './../models/heroe.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  //////// Buscar métodos //////////

  /** Busca heróis do servidor */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** Busca herói pelo id. Será 404 se id não encontrado */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //////// Guarda métodos //////////

  /** POST: Adiciona um novo herói ao servidor */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** PUT: Atualiza o herói no servidor */
  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** DELETE: Apaga o heroi do servidor */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * Lidar com a operação HTTP que falhou.
   * Deixe o aplicativo continuar.
   * @param operation - Nome da operação que falhou
   * @param result - valor opcional para retornar como resultado observável
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: enviar o erro para a infraestrutura de registo remoto
      console.error(error); // log to console instead

      // TODO: melhor trabalho de transformar um erro para o failed do utilizador
      this.log(`${operation} failed: ${error.message}`);

      // Deixe o aplicativo continuar executando retornando um resultado vazio.
      return of(result as T);
    };
  }

  /** Regista uma mensagem HeroService com o MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
