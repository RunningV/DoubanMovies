import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {MovieDetailPage} from '../movie-detail/movie-detail';
import {MoviesData} from '../../providers/movies-data';
/*
  Generated class for the MoviesListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/movies-list/movies-list.html',
})
export class MoviesListPage {
  private moviesId = [];
  private moviesDetail = [];
  private hasMovies: boolean = true;
  private countId: number = 4;
  constructor(
    private service: MoviesData,
    private navCon: NavController,
    params: NavParams
    ) {
    this.moviesId = params.get('id').concat();
  }

  ngOnInit() {
    this.loadMoives();
  }

  private loadMoives(scroll?) {
    this.moviesId.splice(0,4).forEach(id => {
       this.service.loadComments(id).subscribe(
        data => {
          this.moviesDetail.push(data);
          if(scroll){
            scroll.complete();
          }
        })
      })
  }
  private doInfinite(scroll) {
    if(this.moviesId.length >0){
      this.loadMoives(scroll);
    }else{
      scroll.enable(false);
      this.hasMovies = false;
    }
  }

  public goDetail(id) {
    this.navCon.push(MovieDetailPage, {id: id});
  }
}
