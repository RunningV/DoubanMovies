import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MoviesData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MoviesData {
  data: any;

  constructor(
    private http: Http,
    private jsonp: Jsonp
    ) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }


    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.jsonp.request('http://api.douban.com/v2/movie/top250')
        .map(res => {
          res.json();
        })
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });/**/
    });
  }

  loadMovies() {
    return this.http.get('http://api.douban.com/v2/movie/top250')
      .map(res => res.json());
  }
}

