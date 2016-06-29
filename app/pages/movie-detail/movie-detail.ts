import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MoviesData} from '../../providers/movies-data';

/*
  Generated class for the MovieDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/movie-detail/movie-detail.html',
})
export class MovieDetailPage {
  private movieId;
  private movieData;
  constructor(
    private nav: NavController,
    private service: MoviesData,
    params: NavParams) {
    this.movieId = params.get('id');
  }

  ngOnInit() {
    this.service.loadComments(this.movieId).subscribe(
      data => {
        data.castsName = [];
          if(data.casts){
            data.casts.forEach(cast => {
              data.castsName.push(cast.name);
            })
          }else{
            data.castsName.push('No cast providered');
          }
        this.movieData = data;
        console.log(data);
      })
  }
}
