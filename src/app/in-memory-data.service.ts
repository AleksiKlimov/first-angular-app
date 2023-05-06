import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
      const heroesDick = [
        { id: 12, name: 'Dr. Nice' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr. IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' },
      ];
      console.log('createDB', reqInfo);
      return { heroesDick };
  }

  genId(heroesDick: Hero[]): any {
    console.log('genId', heroesDick)
    console.log(Math.max(...heroesDick.map((item) => item.id)) + 1)
    const maxId = heroesDick.length > 0 ? Math.max(...heroesDick.map(item => item.id)) + 1 : 11;
    console.log(maxId);
    return maxId;
  }
}
