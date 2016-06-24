import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MoviesData} from '../../providers/movies-data';
/*
  Generated class for the MoviesPage page.
  Allow-Control-Allow-Origin: *
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/movies/movies.html',
  providers: [MoviesData]
})
export class MoviesPage {
  private topMoviesData;
  constructor(
    private nav: NavController,
    private service: MoviesData
    ) {}

  ngOnInit() {
    this.service.loadMovies().subscribe(
      data => {
        console.log(data);
        this.topMoviesData = data;
      })
  }
}
