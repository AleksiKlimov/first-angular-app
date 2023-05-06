import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, filter, map, tap } from 'rxjs/operators';

import { Hero } from "./hero";
import { MessageService } from "./message.service";

@Injectable({ providedIn: 'root'})
export class HeroService {

  private heroesUrl = 'api/heroesDick';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<Hero[]> {
    console.log('getHeroees service')
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(h => this.log(`fetched heroes28: ${JSON.stringify(h)}}`)),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    console.log('get 404 service', id)
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]),
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`)
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHero(id: number): Observable<Hero> {
    console.log('getHero by id service', id)
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`))
    );
  }

  searchHero(term: string): Observable<Hero[]> {
    console.log('searchHero term service', term)
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(
          heroes => heroes.length
          ? this.log(`tap work found heroes matching ${term}`)
          : this.log(`tap work no heroes matching ${term}`)
          ),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
  }

  addHero(name: string): Observable<Hero> {
    console.log('addHero service', name);
    return this.http.post<Hero>(this.heroesUrl, { name }, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`tap work added hero w/ id=${newHero.id} ept ${newHero}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    console.log('deleteHero work service')
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url).pipe(
      tap((hero: Hero) => this.log(`tap work hero was deleted his id=${id} hero ${hero}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    console.log('udateHero work service')
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((item) => this.log(`tap work hero was updated his data=${hero} dick: ${item}`)),
      catchError(this.handleError<any>(`hero was updated`))
    );
  }

/**
  * Handle Http operation that failed
  * Let the app continue.
  *
  * @param operation -name of the operation that failed
  * @param result - optional value to return as the observable result
  * @returns - to chto prishlo from result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    console.log('handleError work service 1036ddf', operation, result)
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }

  private log(message: string) {
    console.log(message);
    this.messageService.add(`HeroService 118: ${message}`);
  }
}
