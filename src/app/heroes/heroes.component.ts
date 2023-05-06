import { Component, OnInit } from '@angular/core';
import { HeroService } from './../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  Math: Math;

  constructor(private heroService: HeroService) {
    this.Math = Math
  }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    console.log('getHeroes component')
    this.heroService.getHeroes()
    .subscribe(heroes => {
      console.log(heroes)
      this.heroes = heroes
    })
  }

  addHero(name: string): void {
    console.log(name);
    const trimName = name.trim();
    if (!trimName) return;
    this.heroService.addHero(name)
      .subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: Hero): void {
    console.log(hero);
    const { name, id } = hero;
    this.heroes = this.heroes.filter(item => item.id !== id);
    this.heroService.deleteHero(id).subscribe(dick => console.log('dick', dick));
  }
}
