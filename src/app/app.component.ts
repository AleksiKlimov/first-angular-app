import { Component, OnInit } from '@angular/core';
import { Observable, filter, map, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  customOperator = pipe(
    tap((data) => console.log('tap ' + data)),
    filter((data) => (data as number) > 2),
    tap((data) => console.log('filter ' + data)),
    map((val) => {
      return (val as number) * 2;
    }),
    tap((data) => console.log('final ' + data))
  );

  observer = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.next(5);
    observer.next(6);
    observer.next(4);
    observer.next(1);
    observer.next(1);
    observer.next(1);
    observer.complete();
  })

  data: number[] = [];

  ngOnInit(): void {
    this.observer.subscribe((val) => this.data.push(val as number));
    console.log(this.data, 9999);
    this.customOperator(this.observer).subscribe((i) => console.log(i))
  }
}
