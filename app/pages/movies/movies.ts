import { Component, ViewChild} from '@angular/core';
import { NavController, Nav} from 'ionic-angular';
// import {} from 'lodash';
import {MoviesListPage} from '../movies-list/movies-list';
import {MovieDetailPage} from '../movie-detail/movie-detail';
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
  @ViewChild(Nav) private nav: Nav;

  private topMoviesData;
  private latestMoviesData;
  private latestMoviesComments = [];
  private topMoviesId = [];
  private latestMoviesId = [];
  constructor(
    private navCon: NavController,
    private service: MoviesData
    ) {}

  ngOnInit() {
    this.service.loadMovies().subscribe(
      data => {
        console.log(data);
        this.topMoviesData = data;
        if(data.subjects){
          this. topMoviesId = data.subjects.map(sub => sub.id);
        }
      });

    this.service.loadHotMovies().subscribe(
      data => {
        this.latestMoviesData = data;
        if(data.subjects){
          this.latestMoviesId = data.subjects.map(sub => sub.id);
        }
      })
  }

  public toMoviesList(data) {
    this.navCon.push(MoviesListPage, {id: data});
  }

  public doInfinite(scroll) {
    this.latestMoviesId.splice(0,4).forEach(id => {
      this.service.loadComments(id).subscribe(
        data => {
          this.latestMoviesComments.push(data);
          scroll.complete();
          scroll.enable(false);
        })
      })
  }

  public goDetail(id) {
    this.navCon.push(MovieDetailPage, {id: id});
  }
}
